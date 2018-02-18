// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';

import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';

import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../store';
import RootDefault from '../components/Root';
import sagas from '../sagas';


const initialState = window.INITIAL_STATE;
const browserHistory = createHistory();
const store = configureStore(initialState, browserHistory);

syncHistoryWithStore(browserHistory, store);

const render = (RootComponent) => {
  ReactDOM.hydrate(
    <RootComponent
      history={browserHistory}
      store={store}
    />,
    document.getElementById('appContent')
  );
};

let sagaTask = store.runSaga(sagas);
render(RootDefault);

if (module.hot) {
  module.hot.accept('../components/Root', () => {
    // eslint-disable-next-line global-require
    render(require('../components/Root').default);
  });
  module.hot.accept('../sagas', () => {
    // eslint-disable-next-line global-require
    const reloadSagas = require('../sagas').default;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = store.runSaga(reloadSagas);
    });
  });
}
