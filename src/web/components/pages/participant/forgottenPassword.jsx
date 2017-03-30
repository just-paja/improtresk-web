import Col from 'react-bootstrap/lib/Col';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Container from '../../container';
import ResetPassword from '../../participant/resetPassword';

const ForgottenPassword = ({
  resetPassword,
  onResetPasswordChange,
  onResetPasswordSubmit,
}) => (
  <Container>
    <Row>
      <Col md={6} mdOffset={3}>
        <h1>Zapomenuté heslo</h1>
        <p>
          Vyplň svůj e-mail pod kterým se normálně přihlašuješ, zašleme ti na něj
          zprávu s dalšími kroky vedoucími ke změně hesla.
        </p>
        <ResetPassword
          errors={resetPassword.errors}
          form="resetPassword"
          loading={resetPassword.loading}
          onChange={onResetPasswordChange}
          onSubmit={onResetPasswordSubmit}
          values={resetPassword.values}
        />
      </Col>
    </Row>
  </Container>
);

ForgottenPassword.propTypes = {
  resetPassword: PropTypes.object.isRequired,
  onResetPasswordChange: PropTypes.func.isRequired,
  onResetPasswordSubmit: PropTypes.func.isRequired,
};

export default ForgottenPassword;
