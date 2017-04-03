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
  Object.keys(assetsRaw)
    .sort((a, b) => {
      if (a === 'vendor') {
        return 1;
      }
      if (b === 'vendor') {
        return 1;
      }
      if (a === b) {
        return 0;
      }
      return -1;
    })
    .forEach((asset) => {
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

const getAuth = (req) => {
  const authText = req.cookies && req.cookies.auth;
  let auth;
  if (authText) {
    try {
      auth = JSON.parse(authText);
    } catch (e) {
      auth = null;
    }
  }
  return auth || {};
};

export const getStore = (req) => {
  const auth = getAuth(req);
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
      data: auth,
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
      winston.log('silly', 'READY STATE UPDATE', ready);
      if (ready) {
        resolved = true;
        renderToString(componentTree);
        store.dispatch(END);
        resolve();
      }
    }
  });

  winston.log('debug', `INITIAL RENDER: ${req.url}`);
  renderToString(componentTree);
  return Promise.all([
    waitForConfig,
    rootTask.done,
  ]).then(() => {
    winston.log('debug', `REACT RENDER STRING: ${req.url}`);
    return ({
      markup: renderToString(componentTree),
      state: store.getState(),
    });
  });
};

export const renderInHtml = (markupAndState) => {
  const markup = renderToStaticMarkup(pageBase({
    helmet: Helmet.rewind(),
    ...markupAndState,
    ...assets,
  }));

  return `<!DOCTYPE html>${markup}`;
};

export const respondWithHtml = (req, res, markupAndState) => {
  winston.log('silly', 'REACT RENDER STATIC', req.url);
  try {
    return res.send(renderInHtml(markupAndState));
  } catch (e) {
    winston.log('error', e);
  }

  return res.status(500).send('Internal server error');
};
