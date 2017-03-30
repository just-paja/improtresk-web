import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';

import Button from '../button';
import FormErrors from '../formErrors';
import Input from '../inputs/input';

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
    const { disabled, errors, sending, submitErrors, submitted, values } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          disabled={disabled}
          label="E-mail"
          name="email"
          onChange={this.handleChange}
          type="email"
          error={errors.email}
          value={values.email}
          touched={submitted}
        />
        <Input
          disabled={disabled}
          label="Heslo"
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
          icon="key"
          loading={sending}
          type="submit"
        >Přihlásit</Button>
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
  values: PropTypes.object.isRequired,
  sending: PropTypes.bool,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
};

Login.defaultProps = {
  disabled: false,
  sending: false,
  submitErrors: null,
  submitted: false,
};
