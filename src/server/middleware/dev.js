import express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import webpackConfig from '../../../webpack/dev';

const compiler = webpack(webpackConfig);

const app = express();

app.use(webpackDev(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: false,
}));

app.use(webpackHot(compiler));

export default app;
