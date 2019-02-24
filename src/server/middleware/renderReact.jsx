import fs from 'fs';
import Helmet from 'react-helmet';
import path from 'path';
import React from 'react';
import { parse as parseLanguages } from 'accept-language-parser';

import { END } from 'redux-saga';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../../containers/App';
import configure from '../config';
import configureStore from '../../store';
import logger from '../logger';
import pageBase from '../components/pageBase';


import { serverSagas } from '../../sagas';
import { getAppProgress } from '../../selectors/app';

const assetTypes = ['css', 'js'];
const assets = {
  js: [],
  css: [
    '/static/theme/styles/page.css',
  ],
};

if (process.env.NODE_ENV === 'production') {
  const assetsPath = path.resolve('./dist/webpack-assets.json');
  const assetsRaw = JSON.parse(fs.readFileSync(assetsPath));
  Object.keys(assetsRaw)
    .sort((a, b) => {
      if (a === 'vendor') {
        return 1;
      }
      if (b === 'vendor') {
        return 1;
      }
      if (a === b) {
        return 0;
      }
      return -1;
    })
    .forEach((asset) => {
      assetTypes.forEach((type) => {
        if (assetsRaw[asset][type]) {
          assets[type].push(`/assets/${assetsRaw[asset][type]}`);
        }
      });
    });
} else {
  assets.js.push('/assets/app.js');
}

export const getComponentTree = (req, store, context) => (
  <Provider store={store}>
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  </Provider>
);

const getAuth = (req) => {
  const authText = req.cookies && req.cookies.auth;
  let auth;
  if (authText) {
    try {
      auth = JSON.parse(authText);
    } catch (e) {
      auth = null;
    }
  }
  return auth || {};
};

export const getStore = (req) => {
  const auth = getAuth(req);
  const config = configure();
  const initialState = {
    device: {
      isMobile: ['phone', 'gtablet'].indexOf(req.device.type) > -1,
    },
    server: {
      host: req.hostname,
      protocol: req.protocol,
      pathLang: req.path.split('/')[1] || null,
      entryPath: req.path,
      acceptsLanguages: parseLanguages(req.headers['accept-language'])
        .map((item) => {
          if (item.region) {
            return `${item.code}-${item.region}`;
          }
          return item.code;
        }),
    },
    session: {
      apiSource: config.apiSource,
      data: auth,
    },
  };

  return configureStore(initialState);
};

export const renderMarkupAndWait = (req, store, componentTree) => {
  const rootTask = store.sagaMiddleware.run(serverSagas);
  let resolved = false;
  let resolve;

  const waitForConfig = new Promise((promiseResolve) => {
    resolve = promiseResolve;
  });

  store.subscribe(() => {
    if (!resolved) {
      const progress = getAppProgress(store.getState());
      logger.debug('READY STATE UPDATE', progress);
      if ((progress.failed || progress.valid) && !progress.loading) {
        if (progress.failed) {
          logger.error(progress.errors);
        }
        resolved = true;
        renderToString(componentTree);
        setTimeout(() => {
          store.dispatch(END);
        }, 5);
        resolve();
        logger.debug('SAGAS READY');
      }
    }
  });
  store.dispatch({ type: 'SILLY_INIT' });

  logger.debug(`INITIAL RENDER: ${req.url}`);
  try {
    renderToString(componentTree);
  } catch (error) {
    logger.error(error);
    return Promise.reject(error);
  }
  logger.debug(`WAIT FOR STORE: ${req.url}`);
  return Promise.all([
    waitForConfig,
    rootTask.done,
  ]).then(() => {
    logger.debug(`REACT RENDER STRING: ${req.url}`);
    return ({
      markup: renderToString(componentTree),
      state: store.getState(),
    });
  });
};

export const renderInHtml = (markupAndState) => {
  const markup = renderToStaticMarkup(pageBase({
    helmet: Helmet.rewind(),
    ...markupAndState,
    ...assets,
  }));

  return `<!DOCTYPE html>${markup}`;
};

export const respondWithHtml = (req, res, markupAndState, routerContext) => {
  if (routerContext && routerContext.action === 'REPLACE' && req.url !== routerContext.url) {
    logger.debug('REDIRECT', req.url, routerContext.url);
    return res.redirect(routerContext.url);
  }
  logger.debug('REACT RENDER STATIC', req.url);
  try {
    return res.send(renderInHtml(markupAndState));
  } catch (e) {
    logger.error(e);
  }

  return res.status(500).send('Internal server error');
};
