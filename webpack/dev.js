import webpack from 'webpack';

import { loaders, globalOptions, frontendEntry, frontendPlugins } from './common';

export default {
  ...globalOptions,
  entry: [
    'webpack-hot-middleware/client',
    frontendEntry,
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
      ...loaders,
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
  plugins: [
    ...frontendPlugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        IS_BROWSER: 'true',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
