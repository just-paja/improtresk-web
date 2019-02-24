// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill'

import createHistory from 'history/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'

import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../store'
import RootDefault from '../components/Root'
import sagas from '../sagas'

const initialState = window.INITIAL_STATE
const browserHistory = createHistory()
const store = configureStore(initialState, browserHistory)

syncHistoryWithStore(browserHistory, store)

const render = (RootComponent) => {
  ReactDOM.hydrate(
    <RootComponent
      history={browserHistory}
      store={store}
    />,
    document.getElementById('appContent')
  )
}

let sagaTask

const startUp = () => {
  sagaTask = store.runSaga(sagas)
  render(RootDefault)
}

const runWithRaven = () => {
  global.Raven.config('https://c59e8f1e7a55412c882cc62f4e02e335@sentry.io/1201657', {
    environment: process.env.NODE_ENV,
    whitelistUrls: [/improtresk\.cz/]
  }).install()
  global.Raven.context(startUp)
}

if (global.Raven) {
  runWithRaven()
} else {
  startUp()
}

if (module.hot) {
  module.hot.accept('../components/Root', () => {
    // eslint-disable-next-line global-require
    render(require('../components/Root').default)
  })
  module.hot.accept('../sagas', () => {
    // eslint-disable-next-line global-require
    const reloadSagas = require('../sagas').default
    sagaTask.cancel()
    sagaTask.done.then(() => {
      sagaTask = store.runSaga(reloadSagas)
    })
  })
}
