import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';

import configureStore from './store';
import RootDefault from './components/root';
import sagas from './sagas';

const initialState = window.INITIAL_STATE;
const store = configureStore(initialState);

const render = (RootComponent) => {
  store.runSaga(sagas);

  ReactDOM.render(
    <RootComponent
      history={browserHistory}
      store={store}
    />,
    document.getElementById('appContent')
  );
};

render(RootDefault);

if (module.hot) {
  module.hot.accept('./components/root', () => {
    // eslint-disable-next-line global-require
    render(require('./components/root').default);
  });
}
