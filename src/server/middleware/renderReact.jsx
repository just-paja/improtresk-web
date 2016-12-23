import fs from 'fs';
import path from 'path';
import React from 'react';
import winston from 'winston';

import { END } from 'redux-saga';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { RouterContext } from 'react-router';

import configureStore, { sagaMiddleware } from '../../web/store';
import pageBase from '../components/pageBase';
import sagas from '../../web/sagas';

const assetTypes = ['css', 'js'];
const assets = {
  js: [],
  css: [],
};

if (process.env.NODE_ENV === 'production') {
  const assetsPath = path.resolve('./dist/webpack-assets.json');
  const assetsRaw = JSON.parse(fs.readFileSync(assetsPath));
  Object.keys(assetsRaw).forEach((asset) => {
    assetTypes.forEach((type) => {
      if (assetsRaw[asset][type]) {
        assets[type].push(assetsRaw[asset][type]);
      }
    });
  });
} else {
  assets.js.push('app.js');
}

const getComponentTree = (store, renderProps) => (
  <Provider store={store}>
    <RouterContext {...renderProps} />
  </Provider>
);

const renderFromRouter = (store, renderProps) =>
  renderToString(getComponentTree(store, renderProps));

export const renderMarkupAndWait = (req, renderProps) => {
  const initialState = {
    device: {
      isMobile: ['phone', 'gtablet'].indexOf(req.device.type) > -1,
    },
    server: {
      host: req.get('host'),
      protocol: req.protocol,
    },
  };
  const store = configureStore(initialState);
  const rootTask = sagaMiddleware.run(sagas);

  renderFromRouter(store, renderProps);
  store.dispatch(END);
  return rootTask.done
    .then(() => ({
      markup: renderFromRouter(store, renderProps),
      state: store.getState(),
    }));
};

export const renderInHtml = markupAndState => renderToStaticMarkup(pageBase({
  ...markupAndState,
  ...assets,
}));

export const respondWithHtml = (req, res, markupAndState) => {
  try {
    return res.send(renderInHtml(markupAndState));
  } catch (e) {
    winston.log('error', e);
  }

  return res.status(500).send('Internal server error');
};

export const renderAndRespond = (req, res, renderProps) =>
  renderMarkupAndWait(req, renderProps)
    .then(markupAndState => respondWithHtml(req, res, markupAndState));
