import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';

import Button from '../button';
import FormErrors from '../formErrors';
import Input from '../inputs/input';

export default class ChangePassword extends Component {
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
      newPassword,
      submitErrors,
      values,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {newPassword ? null : (
          <Input
            disabled={loading}
            error={errors.oldPassword}
            name="oldPassword"
            onChange={this.handleChange}
            type="password"
            value={values.oldPassword}
          />
        )}
        <Input
          disabled={loading}
          error={errors.newPassword}
          name="newPassword"
          onChange={this.handleChange}
          type="password"
          value={values.newPassword}
        />
        <Input
          disabled={loading}
          error={errors.newPasswordConfirm}
          name="newPasswordConfirm"
          onChange={this.handleChange}
          type="password"
          value={values.newPasswordConfirm}
        />
        <FormErrors errors={submitErrors} />
        <Button loading={loading} type="submit">Změnit heslo</Button>
      </Form>
    );
  }
}

ChangePassword.propTypes = {
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  newPassword: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

ChangePassword.defaultProps = {
  loading: false,
  newPassword: false,
  submitErrors: null,
};
