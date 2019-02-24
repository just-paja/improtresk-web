import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Message from '../../containers/Message'

export default class QrCheckinLink extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  getCodeUrl () {
    return `${this.props.apiUrl}/user/code/?access_token=${this.props.accessToken}`
  }

  handleClick (e) {
    e.preventDefault()
    window.open(this.getCodeUrl())
  }

  render () {
    return (
      <a className='btn btn-primary' href={this.getCodeUrl()} onClick={this.handleClick}>
        <FontAwesome name='ticket' />
        {' '}
        <Message name='participants.qrCheckin' />
      </a>
    )
  }
}

QrCheckinLink.propTypes = {
  accessToken: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired
}
