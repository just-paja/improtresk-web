import Alert from 'reactstrap/lib/Alert'
import PropTypes from 'prop-types'
import React from 'react'

import ErrorSummary from './ErrorSummary'
import Message from '../containers/Message'

const ResourceError = ({ error }) => (
  <Alert color='danger'>
    <h3><Message name='generic.oops' /></h3>
    <details>
      <summary><Message name='generic.loadingFailed' /></summary>
      <ErrorSummary error={error} />
    </details>
  </Alert>
)

ResourceError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
}

ResourceError.defaultProps = {
  error: null
}

export default ResourceError
