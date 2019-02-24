import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import React from 'react'

import Countdown from '../../components/Countdown'

const SignupCountdown = ({ closeDate, openDate, onOpen }) => {
  if (!moment().isBefore(openDate)) {
    return (
      <Countdown
        date={closeDate}
        countdownMessage='years.signupsCloseIn'
        readyMessage='years.signupsWereClosed'
        suffix
      />
    )
  }
  return (
    <Countdown
      date={openDate}
      countdownMessage='years.signupsWillOpen'
      onFinish={onOpen}
      readyMessage='years.signupsAreOpen'
      suffix
    />
  )
}

SignupCountdown.propTypes = {
  onOpen: PropTypes.func,
  openDate: PropTypes.string.isRequired,
  closeDate: PropTypes.string.isRequired
}

SignupCountdown.defaultProps = {
  onOpen: null
}

export default SignupCountdown
