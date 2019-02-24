import Alert from 'reactstrap/lib/Alert'
import React from 'react'

import Message from '../../containers/Message'

const SignupTooLate = () => (
  <Alert>
    <Message name='participants.signupTooLate' />
  </Alert>
)

export default SignupTooLate
