import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormData } from '../../proptypes';

import Button from '../../components/Button';
import Message from '../../containers/Message';
import FormErrors from '../../forms/containers/FormErrors';
import Input from '../../forms/components/Input';

export default class ChangePassword extends Component {
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
    const {
      formData,
      newPassword,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {newPassword ? null : (
          <Input
            disabled={formData.loading}
            error={formData.fieldErrors.oldPassword}
            name="oldPassword"
            onChange={this.handleChange}
            type="password"
            label={<Message name="participants.oldPassword" />}
            value={formData.values.oldPassword}
          />
        )}
        <Input
          disabled={formData.loading}
          error={formData.fieldErrors.newPassword}
          name="newPassword"
          onChange={this.handleChange}
          type="password"
          label={<Message name="participants.newPassword" />}
          value={formData.values.newPassword}
        />
        <Input
          disabled={formData.loading}
          error={formData.fieldErrors.newPasswordConfirm}
          name="newPasswordConfirm"
          onChange={this.handleChange}
          type="password"
          label={<Message name="participants.newPasswordCheck" />}
          value={formData.values.newPasswordConfirm}
        />
        <FormErrors errors={formData.submitErrors} />
        <Button loading={formData.loading} type="submit">Změnit heslo</Button>
      </Form>
    );
  }
}

ChangePassword.propTypes = {
  formData: FormData.isRequired,
  newPassword: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
  newPassword: false,
};
