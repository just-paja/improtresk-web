import fs from 'fs';
import Helmet from 'react-helmet';
import path from 'path';
import React from 'react';
import winston from 'winston';

import { END } from 'redux-saga';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { RouterContext } from 'react-router';

import configure from '../config';
import configureStore from '../../web/store';
import pageBase from '../components/pageBase';
import sagas from '../../web/sagas';

import { isAppReady } from '../../web/selectors/app';

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

export const getComponentTree = (store, renderProps) => (
  <Provider store={store}>
    <RouterContext {...renderProps} />
  </Provider>
);

export const getStore = (req) => {
  const config = configure();
  const initialState = {
    device: {
      isMobile: ['phone', 'gtablet'].indexOf(req.device.type) > -1,
    },
    server: {
      host: req.hostname,
      protocol: req.protocol,
    },
    session: {
      apiSource: config.apiSource,
    },
  };

  return configureStore(initialState, config.logLevel === 'info');
};

export const renderMarkupAndWait = (req, store, componentTree) => {
  const rootTask = store.sagaMiddleware.run(sagas);
  let resolved = false;
  let resolve;

  const waitForConfig = new Promise((promiseResolve) => {
    resolve = promiseResolve;
  });

  store.subscribe(() => {
    if (!resolved) {
      const ready = isAppReady(store.getState());
      if (ready) {
        resolved = true;
        renderToString(componentTree);
        store.dispatch(END);
        resolve();
      }
    }
  });

  renderToString(componentTree);
  return Promise.all([
    waitForConfig,
    rootTask.done,
  ]).then(() => ({
    markup: renderToString(componentTree),
    state: store.getState(),
  }));
};

export const renderInHtml = markupAndState => renderToStaticMarkup(pageBase({
  helmet: Helmet.rewind(),
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
