import webpack from 'webpack'

import { loaders, globalOptions, frontendEntry, frontendPlugins } from './common'

export default {
  ...globalOptions,
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    frontendEntry
  ],
  output: {
    filename: 'app.js',
    path: '/',
    publicPath: 'http://localhost:3000/assets'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'standard-loader'
      },
      ...loaders,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    ...frontendPlugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        IS_BROWSER: 'true'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
