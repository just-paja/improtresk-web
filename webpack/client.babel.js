/* eslint-disable import/no-extraneous-dependencies */

import AssetsPlugin from 'assets-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

import { getCssLoaders, loaders, globalOptions, frontendEntry, frontendPlugins, cssExtract } from './common'

export default {
  ...globalOptions,
  mode: 'production',
  entry: {
    main: frontendEntry
  },
  output: {
    path: path.resolve(__dirname, '../dist/frontend'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      ...getCssLoaders(true),
      ...loaders
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 512 * 1024
    }
  },
  plugins: [
    ...frontendPlugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        IS_BROWSER: 'true'
      }
    }),
    cssExtract.plugin,
    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist')
    })
  ],
  node: {
    fs: 'empty'
  }
}
