import PropTypes from 'prop-types'
import React, { Component } from 'react'
import qsm from 'query-string-manipulator'

class TicketRedirect extends Component {
  componentDidMount () {
    window.location = qsm(`${this.props.apiUrl}/user/code/`, {
      set: {
        access_token: this.props.accessToken
      }
    })
  }

  render () {
    return (<div />)
  }
}

TicketRedirect.propTypes = {
  accessToken: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired
}

export default TicketRedirect
