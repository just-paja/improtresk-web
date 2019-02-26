/* eslint-disable import/no-extraneous-dependencies */

import AssetsPlugin from 'assets-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

import { loaders, globalOptions, frontendEntry, frontendPlugins } from './common'

export default {
  ...globalOptions,
  entry: {
    main: frontendEntry
  },
  output: {
    path: path.resolve(__dirname, '../dist/frontend'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      ...loaders
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
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
    new ExtractTextPlugin('[name].[hash].css'),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist')
    })
  ]
}
