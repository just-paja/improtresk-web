import PropTypes from 'prop-types'
import React from 'react'

import { formatDate } from '../../components/HumanDate'

import Message from '../../containers/Message'

const SignupWillOpen = ({ signupsOpenDate }) => (
  <p>
    <Message
      name='participants.signupOpenDateExact'
      data={{
        date: formatDate(signupsOpenDate, { showTime: true })
      }}
    />
  </p>
)

SignupWillOpen.propTypes = {
  signupsOpenDate: PropTypes.string.isRequired
}

export default SignupWillOpen
