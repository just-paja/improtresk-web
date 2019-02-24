import Alert from 'reactstrap/lib/Alert'
import React from 'react'

import Message from '../../containers/Message'

const ResetPasswordSuccess = () => (
  <Alert color='success'>
    <h4><Message name='generic.success' /></h4>
    <p>
      <Message name='participants.passwordChangeEmailSent' />
    </p>
  </Alert>
)

export default ResetPasswordSuccess
