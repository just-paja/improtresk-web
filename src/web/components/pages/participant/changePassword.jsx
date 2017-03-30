import Col from 'react-bootstrap/lib/Col';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Container from '../../container';
import ResetPassword from '../../participant/changePassword';

const ChangePassword = ({
  changePassword,
  onChangePasswordChange,
  onChangePasswordSubmit,
}) => (
  <Container>
    <Row>
      <Col md={6} mdOffset={3}>
        <h1>Změna hesla</h1>
        <p>
          Vyplň svoje staré heslo, nové heslo a zopakuj pro kontrolu. Znáš to.
        </p>
        <ResetPassword
          errors={changePassword.errors}
          form="changePassword"
          loading={changePassword.loading}
          onChange={onChangePasswordChange}
          onSubmit={onChangePasswordSubmit}
          values={changePassword.values}
        />
      </Col>
    </Row>
  </Container>
);

ChangePassword.propTypes = {
  changePassword: PropTypes.object.isRequired,
  onChangePasswordChange: PropTypes.func.isRequired,
  onChangePasswordSubmit: PropTypes.func.isRequired,
};

export default ChangePassword;
