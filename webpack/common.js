/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';

export const globalOptions = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

export const serverEntry = path.resolve(__dirname, '../src/server/main.js');
export const frontendEntry = path.resolve(__dirname, '../src/web/main.jsx');

export const frontendPlugins = [
  new webpack.ContextReplacementPlugin(/moment[/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/),
];

export const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel?presets[]=react,presets[]=es2015'],
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff',
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
  },
];

export const optimizePlugins = [
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];
