import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';

import Button from '../button';
import Input from '../inputs/input';

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(input, value) {
    this.props.onChange(this.props.form, input, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.form);
  }

  render() {
    const {
      errors,
      loading,
      values,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          type="email"
          name="email"
          value={values.email}
          error={errors.email}
          disabled={loading}
          onChange={this.handleChange}
        />
        <Button loading={loading} type="submit">Změnit heslo</Button>
      </Form>
    );
  }
}

ResetPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

ResetPassword.defaultProps = {
  loading: false,
};
