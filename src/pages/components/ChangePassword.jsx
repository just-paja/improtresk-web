import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import { FormData } from '../../proptypes';

import Container from '../../components/Container';
import ResetPassword from '../../participants/components/ChangePassword';

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
          formData={changePassword}
          onChange={onChangePasswordChange}
          onSubmit={onChangePasswordSubmit}
        />
      </Col>
    </Row>
  </Container>
);

ChangePassword.propTypes = {
  changePassword: FormData.isRequired,
  onChangePasswordChange: PropTypes.func.isRequired,
  onChangePasswordSubmit: PropTypes.func.isRequired,
};

export default ChangePassword;
