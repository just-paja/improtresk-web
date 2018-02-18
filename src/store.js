import createSagaMiddleware from 'redux-saga';

import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

export const sagaMiddleware = createSagaMiddleware();

const BROWSER_DEVELOPMENT = (
  process.env.NODE_ENV !== 'production' && // eslint-disable-line no-undef
  process.env.IS_BROWSER // eslint-disable-line no-undef
);

export default function configureStore(initialState = {}, history) {
  const middlewares = [];

  if (history) {
    middlewares.push(routerMiddleware(history));
  }

  middlewares.push(sagaMiddleware);

  if (BROWSER_DEVELOPMENT) {
    middlewares.push(createLogger({
      collapsed: true,
      diff: true,
    }));
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    reducers,
    initialState,
    compose(...enhancers)
  );

  // Create hook for async sagas
  store.sagaMiddleware = sagaMiddleware;
  store.runSaga = sagaMiddleware.run;
  return store;
}
