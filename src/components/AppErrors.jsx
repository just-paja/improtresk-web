import PropTypes from 'prop-types'
import React from 'react'

import Container from './Container'
import Message from '../containers/Message'

const mapErrorMessage = (message) => {
  if (typeof message === 'string' && (message === 'Failed to fetch' || message.indexOf('connect') > -1)) {
    return <Message name='error.connection' />
  }

  return <Message name='error.unknown' data={{ message }} />
}

export const AppErrors = ({ errors }) => (!errors || errors.length === 0 ? null : (
  <Container>
    <h1><Message name='app.somethingWentWrong' /></h1>
    <p><Message name='app.errorHelp' /></p>
    <h2><Message name='app.whatWentWrong' /></h2>
    {errors
      .map(mapErrorMessage)
      .sort()
      .filter((message, index, self) => self.indexOf(message) === index)
      .map(error => <p key={error}>{error}</p>)
    }
  </Container>
))

AppErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
}

AppErrors.defaultProps = {
  errors: null
}
