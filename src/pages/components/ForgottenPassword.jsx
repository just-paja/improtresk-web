import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
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
          <Col md={6} mdOffset={3}>
            <h1>Zapomenuté heslo</h1>
            <p>
              Vyplň svůj e-mail pod kterým se normálně přihlašuješ, zašleme ti na něj
              zprávu s dalšími kroky vedoucími ke změně hesla.
            </p>
            {resetPassword.saved ? (
              <Alert bsStyle="success">
                <h4>Povedlo se!</h4>
                <p>Na tvojí adresu jsme odeslali e-mail s instrukcemi ke změně hesla.</p>
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
