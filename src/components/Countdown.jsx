import moment from 'moment'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Message from '../containers/Message'

export default class Countdown extends Component {
  componentWillMount () {
    this.setState({ remaining: this.getRemainingTime() })
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ remaining: this.getRemainingTime() })
    }, 1000)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ remaining: this.getRemainingTime(nextProps.date) })
  }

  componentWillUpdate () {
    if (this.interval && this.state.remaining <= 0) {
      this.stopInterval()
      if (this.props.onFinish) {
        this.props.onFinish()
      }
    }
  }

  componentWillUnmount () {
    this.stopInterval()
  }

  getRemainingTime (date) {
    return Math.max(0, moment(date || this.props.date).diff(moment()))
  }

  stopInterval () {
    clearInterval(this.interval)
    this.interval = null
  }

  render () {
    const { countdownMessage, readyMessage, suffix } = this.props
    const duration = moment.duration(this.state.remaining)
    if (this.state.remaining <= 0) {
      return <Message name={readyMessage} />
    }

    if (countdownMessage) {
      return (
        <Message name={countdownMessage} data={{ duration: duration.humanize(suffix) }} />
      )
    }

    return <span>{duration.humanize(suffix)}</span>
  }
}

Countdown.propTypes = {
  countdownMessage: PropTypes.string,
  date: PropTypes.string.isRequired,
  onFinish: PropTypes.func,
  readyMessage: PropTypes.string.isRequired,
  suffix: PropTypes.bool
}

Countdown.defaultProps = {
  countdownMessage: '',
  onFinish: null,
  suffix: false
}

Countdown.state = {}
