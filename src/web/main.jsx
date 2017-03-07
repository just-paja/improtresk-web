import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';

import configureStore from './store';
import RootDefault from './components/root';
import sagas from './sagas';

const initialState = window.INITIAL_STATE;
const store = configureStore(initialState, false, browserHistory);

const render = (RootComponent) => {
  ReactDOM.render(
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
  module.hot.accept('./components/root', () => {
    // eslint-disable-next-line global-require
    render(require('./components/root').default);
  });
  module.hot.accept('./sagas', () => {
    // eslint-disable-next-line global-require
    const reloadSagas = require('./sagas').default;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = store.runSaga(reloadSagas);
    });
  });
}
