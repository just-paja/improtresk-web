import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import { Provider } from 'react-redux';

import configureStore from './store';
import configureRoutes from './routes';
import sagas from './sagas';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const render = () => {
  store.runSaga(sagas);

  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={configureRoutes(store)}
      />
    </Provider>,
    document.getElementById('appContent')
  );
};

document.addEventListener('DOMContentLoaded', () => render);

if (module.hot) {
  module.hot.accept();
}
