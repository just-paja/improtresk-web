/* eslint-disable import/no-extraneous-dependencies */

import AssetsPlugin from 'assets-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

import { loaders, globalOptions, frontendEntry, frontendPlugins } from './common'

export default {
  ...globalOptions,
  entry: {
    main: frontendEntry,
    vendor: [
      'diacritics',
      'isomorphic-fetch',
      'moment',
      'react',
      // 'react-bootstrap',
      'react-dom',
      'react-fontawesome',
      'react-router',
      'react-router-bootstrap',
      'redux',
      'redux-saga'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/frontend'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
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
  plugins: [
    ...frontendPlugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        IS_BROWSER: 'true'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist')
    })
  ]
}
