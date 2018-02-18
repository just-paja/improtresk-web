import FontAwesome from 'react-fontawesome';
import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import FormErrors from '../../forms/containers/FormErrors';
import Input from '../../forms/components/Input';
import Link from '../../containers/Link';
import Message from '../../containers/Message';

export default class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.props.onChange(this.props.form, name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.form);
  }

  render() {
    const {
      disabled,
      errors,
      sending,
      submitErrors,
      submitted,
      values,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          disabled={disabled}
          label={<Message name="participants.email" />}
          name="email"
          onChange={this.handleChange}
          type="email"
          error={errors.email}
          value={values.email}
          touched={submitted}
        />
        <Input
          disabled={disabled}
          label={<Message name="participants.password" />}
          name="password"
          onChange={this.handleChange}
          type="password"
          error={errors.password}
          value={values.password}
          touched={submitted}
        />
        <FormErrors errors={submitErrors} />
        <Button
          bsStyle="primary"
          disabled={disabled}
          icon="sign-in"
          loading={sending}
          type="submit"
        >
          {<Message name="participants.login" />}
        </Button>
        <Link className="pull-right" to="participantForgottenPassword">
          <FontAwesome className="fa-fw" name="key" />
          {' '}
          <span>{<Message name="participants.forgottenPassword" />}</span>
        </Link>
      </Form>
    );
  }
}

Login.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  sending: PropTypes.bool,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
  values: PropTypes.object.isRequired,
};

Login.defaultProps = {
  disabled: false,
  sending: false,
  submitErrors: null,
  submitted: false,
};
