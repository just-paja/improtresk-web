import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const globalOptions = {
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

export const serverEntry = path.resolve(__dirname, '../src/server/main.js')
export const frontendEntry = path.resolve(__dirname, '../src/web/main.jsx')

export const cssExtract = {
  plugin: new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  loader: MiniCssExtractPlugin.loader
}

export const frontendPlugins = [
  new webpack.ContextReplacementPlugin(/moment[/]locale$/, /^\.\/(en|cs|ko|ja|zh-cn)$/)
]

export const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  },
  {
    test: /\.(png|jpg|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  }
]

const getCssModuleLoaders = (extract, modules) => [
  extract ? cssExtract.loader : 'style-loader',
  { loader: 'css-loader', options: { modules, importLoaders: 1 } },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      config: {
        path: path.resolve(__dirname, '..', 'postcss.config.js')
      }
    }
  }
]

export const getCssLoaders = (extract = false) => [
  {
    include: /node_modules/,
    test: /\.css$/,
    use: getCssModuleLoaders(extract, false)
  },
  {
    exclude: /node_modules/,
    test: /\.css$/,
    use: getCssModuleLoaders(extract, true)
  }
]
