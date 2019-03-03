import createSagaMiddleware from 'redux-saga'

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

export const sagaMiddleware = createSagaMiddleware()

const DEVELOPMENT = process.env.NODE_ENV !== 'production' // eslint-disable-line no-undef
const IS_BROWSER = !!process.env.IS_BROWSER // eslint-disable-line no-undef

const getLogger = () => {
  try {
    return require('./server/logger').logger
  } catch (e) {
  }
  return console
}

export default function configureStore (initialState = {}, history) {
  const middlewares = []

  if (history) {
    middlewares.push(routerMiddleware(history))
  }

  middlewares.push(sagaMiddleware)

  if (DEVELOPMENT && IS_BROWSER) {
    middlewares.push(createLogger({
      collapsed: true,
      diff: true
    }))
  } else if (!IS_BROWSER) {
    middlewares.push(() => next => (action) => {
      getLogger().debug(`store: ${action.type}`)
      next(action)
    })
  }

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(
    reducers,
    initialState,
    compose(...enhancers)
  )

  // Create hook for async sagas
  store.sagaMiddleware = sagaMiddleware
  store.runSaga = sagaMiddleware.run
  return store
}
