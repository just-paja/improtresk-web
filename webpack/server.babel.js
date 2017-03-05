/* eslint-disable import/no-extraneous-dependencies */

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import webpack from 'webpack';

import { loaders, globalOptions, serverEntry, frontendPlugins, optimizePlugins } from './common';

export default {
  ...globalOptions,
  entry: serverEntry,
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      ...loaders,
    ],
  },
  plugins: [
    ...frontendPlugins,
    new webpack.IgnorePlugin(/webpack-assets\.json$/),
    new ExtractTextPlugin('[name].css'),
    ...optimizePlugins,
  ],
};
