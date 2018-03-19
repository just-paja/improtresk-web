import Alert from 'reactstrap/lib/Alert';
import React from 'react';

import Message from '../../containers/Message';
import Link from '../../containers/Link';

const ChangePasswordSuccess = () => (
  <div>
    <Alert color="success">
      <h4><Message name="generic.success" /></h4>
      <p>
        <Message name="participants.changePasswordSuccess" />
      </p>
    </Alert>
    <Link to="signup"><Message name="participants.login" /></Link>
  </div>
);

export default ChangePasswordSuccess;
