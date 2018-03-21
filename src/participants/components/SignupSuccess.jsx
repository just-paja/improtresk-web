import Alert from 'reactstrap/lib/Alert';
import React from 'react';

import Message from '../../containers/Message';

const SignupSuccess = () => (
  <Alert color="success">
    <h4><Message name="generic.success" /></h4>
    <p>
      <Message name="participants.signupSuccess" />
    </p>
  </Alert>
);

export default SignupSuccess;
