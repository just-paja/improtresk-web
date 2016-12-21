import webpack from 'webpack';

import { resolve } from 'path';

import common from './common';

export default {
  ...common,
  entry: [
    'webpack-hot-middleware/client',
    `${resolve(__dirname, '..')}/src/web/main.jsx`,
  ],
  output: {
    filename: 'app.js',
    path: '/',
    publicPath: 'http://localhost:3000/assets',
  },
  devtool: 'eval-source-map',
  module: {
    preLoaders: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react,presets[]=es2015'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        IS_BROWSER: 'true',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/),
  ],
};
