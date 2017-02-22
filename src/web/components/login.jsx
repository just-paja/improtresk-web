import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';

import Button from './button';
import Input from './input';

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
    const { errors, sending, submitted, values } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          label="E-mail"
          name="email"
          onChange={this.handleChange}
          type="email"
          error={errors.email}
          value={values.email}
          touched={submitted}
        />
        <Input
          label="Heslo"
          name="password"
          onChange={this.handleChange}
          type="password"
          error={errors.password}
          value={values.password}
          touched={submitted}
        />
        <Button
          bsStyle="primary"
          icon="key"
          loading={sending}
          type="submit"
        >Přihlásit</Button>
      </Form>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  sending: PropTypes.bool,
  submitted: PropTypes.bool,
};

Login.defaultProps = {
  sending: false,
  submitted: false,
};
