import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

export const sagaMiddleware = createSagaMiddleware();

export const getDevTools = () =>
  (
    typeof window !== 'undefined' &&
    window.devToolsExtension &&
    window.devToolsExtension()
  ) || (noop => noop);

const BROWSER_DEVELOPMENT = (
  process.env.NODE_ENV !== 'production' && // eslint-disable-line no-undef
  process.env.IS_BROWSER // eslint-disable-line no-undef
);

export default function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
  ];

  if (BROWSER_DEVELOPMENT) {
    middlewares.push(createLogger({ collapsed: true }));
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    getDevTools(),
  ];

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  );

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run;
  return store;
}
