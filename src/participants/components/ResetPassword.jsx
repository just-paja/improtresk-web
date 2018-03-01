import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import Message from '../../containers/Message';
import Input from '../../forms/components/Input';

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
      <Form className="was-walidated" onSubmit={this.handleSubmit}>
        <Input
          type="email"
          name="email"
          label={<Message name="participants.email" />}
          value={values.email}
          error={errors.email}
          disabled={loading}
          required
          onChange={this.handleChange}
        />
        <Button loading={loading} type="submit">
          <Message name="participants.resetPassword" />
        </Button>
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
