import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBlock from 'reactstrap/lib/CardBlock';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Message from '../containers/Message';
import Login from '../participants/components/Login';
import Signup from '../participants/components/Signup';

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
        <h2><Message name="participants.alreadyRegistered" /></h2>
        <Card>
          <CardBlock>
            <Login
              disabled={disabled}
              form="login"
              onChange={onLoginChange}
              onSubmit={onLoginSubmit}
              {...login}
            />
          </CardBlock>
        </Card>
      </Col>
      <Col md={6}>
        <h2><Message name="participants.registration" /></h2>
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
