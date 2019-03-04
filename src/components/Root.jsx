import Analytics from 'react-ga'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { AppContainer } from '../containers/AppContainer'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'

Analytics.initialize('UA-40099806-8')

const handleHistoryChange = (location) => {
  Analytics.set({ page: location.pathname })
  Analytics.pageview(location.pathname)
}

export default class Root extends Component {
  componentDidMount () {
    this.unlisten = this.props.history.listen(handleHistoryChange)
  }

  componentWillUnmount () {
    this.unlisten()
  }

  render () {
    const { history, store } = this.props
    return (
      <Provider store={store}>
        <Router history={history} >
          <Route render={() => <AppContainer location={history.location} />} />
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object
}

Root.defaultProps = {
  history: null,
  store: null
}
