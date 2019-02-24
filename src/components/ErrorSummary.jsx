import React from 'react'
import PropTypes from 'prop-types'

import Message from '../containers/Message'

const ErrorSummary = ({ error }) => {
  let message = error

  if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message
  }

  if (message) {
    return <span>{message}</span>
  }

  return <Message name='generic.missingErrorDetails' />
}

ErrorSummary.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node
  ])
}

ErrorSummary.defaultProps = {
  error: null
}

export default ErrorSummary
