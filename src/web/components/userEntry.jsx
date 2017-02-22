import Col from 'react-bootstrap/lib/Col';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';


import Signup from './signup';


const UserEntry = ({
  onSignupChange,
  onSignupSubmit,
  signup,
}) => (
  <Row>
    <Col md={6}>
      <h2>Už jsem zaregistrovaný</h2>
    </Col>
    <Col md={6}>
      <h2>Registrace</h2>
      <Signup
        form="signup"
        onChange={onSignupChange}
        onSubmit={onSignupSubmit}
        {...signup}
      />
    </Col>
  </Row>
);

UserEntry.propTypes = {
  onSignupChange: PropTypes.func.isRequired,
  onSignupSubmit: PropTypes.func.isRequired,
  signup: PropTypes.object,
};

UserEntry.defaultProps = {
  signup: null,
};

export default UserEntry;
