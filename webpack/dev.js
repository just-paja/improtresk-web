import webpack from 'webpack'

import { getCssLoaders, loaders, globalOptions, frontendEntry, frontendPlugins } from './common'

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
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'standard-loader'
      },
      ...getCssLoaders(),
      ...loaders
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
