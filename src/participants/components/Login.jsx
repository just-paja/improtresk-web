import FontAwesome from 'react-fontawesome';
import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormData } from '../../proptypes';

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
    this.props.onChange(this.props.formData.formName, name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.formData.formName);
  }

  render() {
    const { disabled, formData } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          disabled={disabled || formData.loading}
          label={<Message name="participants.email" />}
          name="email"
          onChange={this.handleChange}
          type="email"
          error={formData.fieldErrors.email}
          value={formData.values.email}
          touched={formData.submitted}
        />
        <Input
          disabled={disabled || formData.loading}
          label={<Message name="participants.password" />}
          name="password"
          onChange={this.handleChange}
          type="password"
          error={formData.fieldErrors.password}
          value={formData.values.password}
          touched={formData.submitted}
        />
        <FormErrors errors={formData.submitErrors} />
        <Button
          className="pull-right"
          disabled={disabled || formData.loading}
          icon="sign-in"
          loading={disabled || formData.loading}
          type="submit"
        >
          {<Message name="participants.login" />}
        </Button>
        <Link to="participantForgottenPassword">
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
  formData: FormData.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Login.defaultProps = {
  disabled: false,
};
