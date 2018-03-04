import fs from 'fs';
import Helmet from 'react-helmet';
import path from 'path';
import React from 'react';
import winston from 'winston';
import { parse as parseLanguages } from 'accept-language-parser';

import { END } from 'redux-saga';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../../containers/App';
import configure from '../config';
import configureStore from '../../store';
import pageBase from '../components/pageBase';


import { serverSagas } from '../../sagas';
import { getAppProgress } from '../../selectors/app';

const assetTypes = ['css', 'js'];
const assets = {
  js: [],
  css: [
    '/static/theme/styles/page.css',
  ],
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
          assets[type].push(`/assets/${assetsRaw[asset][type]}`);
        }
      });
    });
} else {
  assets.js.push('/assets/app.js');
}

export const getComponentTree = (req, store, context) => (
  <Provider store={store}>
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
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
      pathLang: req.path.split('/')[1] || null,
      acceptsLanguages: parseLanguages(req.headers['accept-language'])
        .map((item) => {
          if (item.region) {
            return `${item.code}-${item.region}`;
          }
          return item.code;
        }),
    },
    session: {
      apiSource: config.apiSource,
      data: auth,
    },
  };

  return configureStore(initialState);
};

export const renderMarkupAndWait = (req, store, componentTree) => {
  const rootTask = store.sagaMiddleware.run(serverSagas);
  let resolved = false;
  let resolve;

  const waitForConfig = new Promise((promiseResolve) => {
    resolve = promiseResolve;
  });

  store.subscribe(() => {
    if (!resolved) {
      const progress = getAppProgress(store.getState());
      winston.log('silly', 'READY STATE UPDATE');
      if ((progress.error || progress.valid) && !progress.loading) {
        resolved = true;
        renderToString(componentTree);
        store.dispatch(END);
        resolve();
        winston.log('silly', 'SAGAS READY');
      }
    }
  });
  store.dispatch({ type: 'SILLY_INIT' });

  winston.log('debug', `INITIAL RENDER: ${req.url}`);
  try {
    renderToString(componentTree);
  } catch (error) {
    winston.log('error', error);
    return Promise.reject(error);
  }
  winston.log('silly', `WAIT FOR STORE: ${req.url}`);
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

export const respondWithHtml = (req, res, markupAndState, routerContext) => {
  winston.log('silly', 'REACT RENDER STATIC', req.url);
  if (routerContext && routerContext.action === 'REPLACE') {
    return res.redirect(routerContext.url);
  }
  try {
    return res.send(renderInHtml(markupAndState));
  } catch (e) {
    winston.log('error', e);
  }

  return res.status(500).send('Internal server error');
};
