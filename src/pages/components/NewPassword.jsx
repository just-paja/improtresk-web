import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import ChangePassword from '../../participants/components/ChangePassword';

export default class NewPassword extends Component {
  componentWillMount() {
    this.props.onMount(this.props.location.query.token);
  }

  componentWillUnmount() {
    this.props.onUnmount('resetPassword');
  }

  render() {
    const {
      newPassword,
      onNewPasswordChange,
      onNewPasswordSubmit,
    } = this.props;
    return (
      <Container>
        <Row>
          <Col md={6} mdOffset={3}>
            <h1>Nové heslo</h1>
            <p>
              Vyplň svoje staré heslo, nové heslo a zopakuj pro kontrolu. Znáš to.
            </p>
            {newPassword.saved ? (
              <Alert bsStyle="success">
                <h4>Povedlo se!</h4>
                <p>
                  Tvoje heslo bylo úspěšně změněno. Můžeš se s ním teď přihlásit.
                </p>
              </Alert>
            ) : (
              <ChangePassword
                form="newPassword"
                newPassword
                onChange={onNewPasswordChange}
                onSubmit={onNewPasswordSubmit}
                {...newPassword}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

NewPassword.propTypes = {
  location: PropTypes.object.isRequired,
  newPassword: PropTypes.object.isRequired,
  onMount: PropTypes.func.isRequired,
  onNewPasswordChange: PropTypes.func.isRequired,
  onNewPasswordSubmit: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
};
