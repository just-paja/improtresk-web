import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from '../components/Button';
import Message from '../containers/Message';
import Login from '../participants/components/Login';
import Signup from '../participants/components/Signup';

export default class UserEntry extends Component {
  constructor() {
    super();
    this.handleToggleForm = this.handleToggleForm.bind(this);
    this.state = {};
  }

  handleToggleForm() {
    this.setState({ showRegistration: !this.state.showRegistration });
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

    if (!this.state.showRegistration) {
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
            <Button
              color="primary"
              disabled={disabled}
              icon="wpforms"
              onClick={this.handleToggleForm}
              size="lg"
            >
              <Message name="participants.registration" />
            </Button>
          </CardBody>
        </Card>
      );
    }
    return (
      <Card>
        <CardBody>
          <h2><Message name="participants.registration" /></h2>
          <Signup
            disabled={disabled}
            formData={signup}
            onChange={onSignupChange}
            onSubmit={onSignupSubmit}
            teams={teams}
          />
          <hr />
          <p>
            <Message name="participants.haveAccount" />
          </p>
          <Button
            color="secondary"
            disabled={disabled}
            icon="sign-in"
            onClick={this.handleToggleForm}
            size="lg"
          >
            <Message name="participants.login" />
          </Button>
        </CardBody>
      </Card>
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
