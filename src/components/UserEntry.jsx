import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import Button from '../components/Button';
import Message from '../containers/Message';
import Login from '../participants/components/Login';
import Signup from '../participants/components/Signup';

export default class UserEntry extends Component {
  constructor() {
    super();
    this.handleEntrySelection = this.handleEntrySelection.bind(this);
    this.state = { selection: null };
  }

  handleEntrySelection(selection) {
    this.setState({ selection });
  }

  render() {
    const {
      login,
      onLoginChange,
      onLoginSubmit,
      onSignupChange,
      onSignupSubmit,
      teams,
      signup,
    } = this.props;

    const disabled = !!(login.loading || signup.loading);

    if (!this.state.selection) {
      return (
        <Card>
          <CardBody>
            <p>
              <Message name="participants.mightHaveAccountHelp" />
            </p>
            <Login
              disabled={disabled}
              formData={login}
              onChange={onLoginChange}
              onSubmit={onLoginSubmit}
            />
            <hr />
            <p>
              <Message name="participants.newUserHelp" />
            </p>
            <Button color="primary" size="lg" icon="wpforms">
              <Message name="participants.registration" />
            </Button>
          </CardBody>
        </Card>
      );
    }
    return (
      <Row>
        <Col md={6}>
          <h2><Message name="participants.registration" /></h2>
          <Signup
            disabled={disabled}
            formData={signup}
            onChange={onSignupChange}
            onSubmit={onSignupSubmit}
            teams={teams}
          />
        </Col>
      </Row>
    );
  }
}

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
