import deviceMiddleware from 'express-device'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import configure from './config'
import api from './api'
import logger from './logger'
import routerRender from './middleware/routerRender'
import errorRender from './middleware/errorRender'
import staticMiddleware from './middleware/static'

export default function server (userConfig = {}) {
  const app = express()
  const config = configure(userConfig)

  logger.level = config.logLevel

  if (config.proxy) {
    app.set('trust proxy', 'loopback')
  }

  app.use('/static', staticMiddleware())

  if (process.env.NODE_ENV === 'production') {
    app.use('/assets', express.static('dist/frontend'))
  }

  app.use(deviceMiddleware.capture())
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.json({ type: 'application/json' }))

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line global-require
    app.use(require('./middleware/dev').default)
  }

  app.use('/frontend', api(config))
  app.use(routerRender)
  app.use(errorRender)

  app.ready = new Promise((resolve) => {
    app.server = app.listen(config.port, () => {
      logger.warn(`Started server on port ${config.port}`)
      logger.warn(`Data API: ${config.apiSource}`)
      logger.warn(`Auth API: ${config.apiAuthSource}`)
      if (config.proxy) {
        logger.warn('Behind trusted proxy')
      }
      resolve()
    })
  })

  return app
}
