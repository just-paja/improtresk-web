import Col from 'react-bootstrap/lib/Col';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Container from '../../container';
import ResetPassword from '../../participant/changePassword';

const ChangePassword = ({
  changePassword,
  onNewPasswordChange,
  onNewPasswordSubmit,
}) => (
  <Container>
    <Row>
      <Col md={6} mdOffset={3}>
        <h1>Nové heslo</h1>
        <p>
          Vyplň svoje staré heslo, nové heslo a zopakuj pro kontrolu. Znáš to.
        </p>
        <ResetPassword
          errors={changePassword.errors}
          form="changePassword"
          loading={changePassword.loading}
          newPassword
          onNew={onNewPasswordChange}
          onSubmit={onNewPasswordSubmit}
          values={changePassword.values}
        />
      </Col>
    </Row>
  </Container>
);

ChangePassword.propTypes = {
  changePassword: PropTypes.object.isRequired,
  onNewPasswordChange: PropTypes.func.isRequired,
  onNewPasswordSubmit: PropTypes.func.isRequired,
};

export default ChangePassword;
