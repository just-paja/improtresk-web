import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack'
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDev from 'webpack-dev-middleware'
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackHot from 'webpack-hot-middleware'

import webpackConfig from '../../../webpack/dev'

const compiler = webpack(webpackConfig)

const app = express()

app.use(webpackDev(compiler, {
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  stats: false
}))

app.use(webpackHot(compiler))

export default app
