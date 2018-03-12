import Alert from 'reactstrap/lib/Alert';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Col from 'reactstrap/lib/Col';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import { getUrlParams } from 'query-string-manipulator';

import Container from '../../components/Container';
import ChangePassword from '../../participants/components/ChangePassword';

export default class NewPassword extends Component {
  componentWillMount() {
    if (this.props.location && this.props.location.search) {
      const token = getUrlParams(this.props.location.search).find(param => param.key === 'token');
      if (token) {
        this.props.onMount(token.value);
      }
    }
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
          <Col md={{ size: 6, offset: 3 }}>
            <h1>Nové heslo</h1>
            <Card>
              <CardBody>
                <p>
                  Vyplň svoje staré heslo, nové heslo a zopakuj pro kontrolu. Znáš to.
                </p>
                {newPassword.saved ? (
                  <Alert color="success">
                    <h4>Povedlo se!</h4>
                    <p>
                      Tvoje heslo bylo úspěšně změněno. Můžeš se s ním teď přihlásit.
                    </p>
                  </Alert>
                ) : (
                  <ChangePassword
                    formData={newPassword}
                    onChange={onNewPasswordChange}
                    onSubmit={onNewPasswordSubmit}
                    newPassword
                  />
                )}
              </CardBody>
            </Card>
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
