/* eslint-disable import/no-extraneous-dependencies */

import nodeExternals from 'webpack-node-externals'
import path from 'path'
import webpack from 'webpack'

import { getCssLoaders, loaders, globalOptions, serverEntry, frontendPlugins, cssExtract } from './common'

export default {
  ...globalOptions,
  mode: 'production',
  entry: serverEntry,
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js'
  },
  target: 'node',
  module: {
    rules: [
      ...getCssLoaders(true),
      ...loaders
    ]
  },
  plugins: [
    ...frontendPlugins,
    new webpack.IgnorePlugin(/webpack-assets\.json$/),
    cssExtract.plugin
  ]
}
