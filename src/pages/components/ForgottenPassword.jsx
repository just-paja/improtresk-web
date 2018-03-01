import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import ResetPassword from '../../participants/components/ResetPassword';

export default class ForgottenPassword extends Component {
  componentWillUnmount() {
    this.props.onUnmount('resetPassword');
  }

  render() {
    const {
      resetPassword,
      onResetPasswordChange,
      onResetPasswordSubmit,
    } = this.props;
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h1><Message name="participants.forgottenPassword" /></h1>
            <p>
              <Message name="participants.forgottenPasswordHelp" />
            </p>
            {resetPassword.saved ? (
              <Alert color="success">
                <h4><Message name="generic.success" /></h4>
                <p>
                  <Message name="participants.passwordChangeEmailSent" />
                </p>
              </Alert>
            ) : (
              <ResetPassword
                form="resetPassword"
                onChange={onResetPasswordChange}
                onSubmit={onResetPasswordSubmit}
                {...resetPassword}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

ForgottenPassword.propTypes = {
  resetPassword: PropTypes.object.isRequired,
  onResetPasswordChange: PropTypes.func.isRequired,
  onResetPasswordSubmit: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
};
