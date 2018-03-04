import React from 'react';

import Link from '../../containers/Link';
import Message from '../../containers/Message';

const RegisterButton = () => (
  <Link className="btn btn-primary" to="participantRegister">
    <Message name="orders.registerToWorkshop" />
  </Link>
);

export default RegisterButton;
