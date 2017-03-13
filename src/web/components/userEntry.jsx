import Col from 'react-bootstrap/lib/Col';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Well from 'react-bootstrap/lib/Well';


import Login from './login';
import Signup from './signup';


const UserEntry = ({
  login,
  onLoginChange,
  onLoginSubmit,
  onSignupChange,
  onSignupSubmit,
  teams,
  signup,
}) => {
  const disabled = !!(login.loading || signup.loading);
  return (
    <Row>
      <Col md={6}>
        <h2>Už jsem zaregistrovaný</h2>
        <Well>
          <Login
            disabled={disabled}
            form="login"
            onChange={onLoginChange}
            onSubmit={onLoginSubmit}
            {...login}
          />
        </Well>
      </Col>
      <Col md={6}>
        <h2>Registrace</h2>
        <Signup
          disabled={disabled}
          form="signup"
          onChange={onSignupChange}
          onSubmit={onSignupSubmit}
          teams={teams}
          {...signup}
        />
      </Col>
    </Row>
  );
};

UserEntry.propTypes = {
  login: PropTypes.object,
  onLoginChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  onSignupChange: PropTypes.func.isRequired,
  onSignupSubmit: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  signup: PropTypes.object,
};

UserEntry.defaultProps = {
  login: null,
  signup: null,
};

export default UserEntry;
