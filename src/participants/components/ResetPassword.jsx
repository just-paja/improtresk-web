import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormData } from '../../proptypes';

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
    this.props.onChange(this.props.formData.formName, input, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.formData.formName);
  }

  render() {
    const { formData } = this.props;

    return (
      <Form className="was-walidated" onSubmit={this.handleSubmit}>
        <Input
          type="email"
          name="email"
          label={<Message name="participants.email" />}
          value={formData.values.email}
          error={formData.fieldErrors.email}
          disabled={formData.loading}
          required
          onChange={this.handleChange}
        />
        <Button loading={formData.loading} type="submit">
          <Message name="participants.resetPassword" />
        </Button>
      </Form>
    );
  }
}

ResetPassword.propTypes = {
  formData: FormData.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
