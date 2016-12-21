import React from 'react';
import winston from 'winston';

import { END } from 'redux-saga';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { RouterContext } from 'react-router';

import configureStore, { sagaMiddleware } from '../../web/store';
import pageBase from '../components/pageBase';
import sagas from '../../web/sagas';

const renderMarkup = (store, renderProps) => renderToString(
  <Provider store={store}>
    <RouterContext {...renderProps} />
  </Provider>
);

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

  renderMarkup(store, renderProps);
  store.dispatch(END);
  return rootTask.done
    .then(() => renderMarkup(store, renderProps));
};

export const renderInHtml = markup => renderToStaticMarkup(pageBase({ markup }));

export const respondWithHtml = (req, res, markup) => {
  try {
    return res.send(renderInHtml(markup));
  } catch (e) {
    winston.log('error', e);
  }

  return res.status(500).send('Internal server error');
};

export const renderAndRespond = (req, res, renderProps) =>
  renderMarkupAndWait(req, renderProps)
    .then(contentMarkup => respondWithHtml(req, res, contentMarkup));
