import fs from 'fs'
import Helmet from 'react-helmet'
import path from 'path'
import React from 'react'

import { AppContainer } from '../../containers/AppContainer'
import { END } from 'redux-saga'
import { getAppProgress } from '../../selectors/app'
import { logger } from '../logger'
import { PageBase } from '../components/PageBase'
import { parse as parseLanguages } from 'accept-language-parser'
import { Provider } from 'react-redux'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { serverSagas } from '../../sagas'
import { StaticRouter } from 'react-router'

import configure from '../config'
import configureStore from '../../store'

const assetTypes = ['css', 'js']
const assets = {
  js: [],
  css: [
    '/static/theme/styles/page.css'
  ]
}

if (process.env.NODE_ENV === 'production') {
  const assetsPath = path.resolve('./dist/webpack-assets.json')
  const assetsRaw = JSON.parse(fs.readFileSync(assetsPath))
  Object.keys(assetsRaw)
    .sort((a, b) => {
      if (a === b) {
        return 0
      }
      if (a.indexOf('vendor') !== -1) {
        return -1
      }
      if (b.indexOf('vendor') !== -1) {
        return -1
      }
      return -1
    })
    .forEach((asset) => {
      assetTypes.forEach((type) => {
        if (assetsRaw[asset][type]) {
          assets[type].push(`/assets/${assetsRaw[asset][type]}`)
        }
      })
    })
} else {
  assets.js.push('/assets/app.js')
}

export const getComponentTree = (req, store, context) => (
  <Provider store={store}>
    <StaticRouter context={context} location={req.url}>
      <AppContainer />
    </StaticRouter>
  </Provider>
)

const getAuth = (req) => {
  const authText = req.cookies && req.cookies.auth
  let auth
  if (authText) {
    try {
      auth = JSON.parse(authText)
    } catch (e) {
      auth = null
    }
  }
  return auth || {}
}

export const getStore = (req) => {
  const auth = getAuth(req)
  const config = configure()
  const initialState = {
    device: {
      isMobile: ['phone', 'gtablet'].indexOf(req.device.type) > -1
    },
    server: {
      host: req.headers.host,
      protocol: req.protocol,
      pathLang: req.path.split('/')[1] || null,
      entryPath: req.path,
      acceptsLanguages: parseLanguages(req.headers['accept-language'])
        .map((item) => {
          if (item.region) {
            return `${item.code}-${item.region}`
          }
          return item.code
        })
    },
    session: {
      apiSource: config.apiSource,
      data: auth
    }
  }

  return configureStore(initialState)
}

export const renderMarkupAndWait = (req, store, componentTree) => {
  logger.debug(`render: sagas: started for ${req.url}`)
  const rootTask = store.sagaMiddleware.run(serverSagas)
  let resolved = false
  let resolveRender

  const waitForConfig = new Promise((resolve) => {
    resolveRender = resolve
  })

  store.subscribe(() => {
    if (!resolved) {
      const progress = getAppProgress(store.getState())
      logger.debug('render: state: ready update', progress)
      if ((progress.failed || progress.valid) && !progress.loading) {
        if (progress.failed) {
          logger.debug('render: progress failure')
          logger.error(progress.errors)
        }
        resolved = true
        renderToString(componentTree)
        setTimeout(() => {
          store.dispatch(END)
        }, 5)
        resolveRender()
        logger.debug('render: sagas: finished')
      }
    }
  })
  store.dispatch({ type: 'SILLY_INIT' })

  logger.info(`render: initial for: ${req.url}`)
  try {
    renderToString(componentTree)
  } catch (error) {
    logger.debug(`render: failed initial for ${req.url}`)
    logger.error(error)
    return Promise.reject(error)
  }
  logger.debug(`render: waiting for store: ${req.url}`)
  return Promise.all([
    waitForConfig,
    rootTask.done
  ]).then(() => {
    logger.debug(`render: final for: ${req.url}`)
    return ({
      markup: renderToString(componentTree),
      state: store.getState()
    })
  })
}

export const renderInHtml = (markupAndState, lang) => {
  const markup = renderToStaticMarkup(
    <PageBase
      helmet={Helmet.renderStatic()}
      lang={markupAndState.state.session.locale}
      {...markupAndState}
      {...assets}
    />
  )
  return `<!DOCTYPE html>${markup}`
}

export const respondWithHtml = (req, res, markupAndState, routerContext) => {
  if (routerContext && routerContext.action === 'REPLACE' && req.url !== routerContext.url) {
    logger.debug(`respond for ${req.url} ${routerContext.url}`)
    return res.redirect(routerContext.url)
  }
  logger.debug(`respond with static for ${req.url}`)
  try {
    return res.send(renderInHtml(markupAndState))
  } catch (e) {
    logger.debug(`error while rendering static markup for ${req.url}`)
    logger.error(e)
  }

  return res.status(500).send('Internal server error')
}
