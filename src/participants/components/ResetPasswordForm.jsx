import Alert from 'reactstrap/lib/Alert';
import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

import { FormGeneralError } from '../../proptypes';

import Button from '../../components/Button';
import Form from '../../forms/components/Form';
import Input from '../../forms/components/Input';
import Message from '../../containers/Message';

const ResetPasswordForm = ({
  error,
  form,
  pristine,
  submit,
  submitSucceeded,
  submitting,
}) => {
  if (submitSucceeded) {
    return (
      <Alert color="success">
        <h4><Message name="generic.success" /></h4>
        <p>
          <Message name="participants.passwordChangeEmailSent" />
        </p>
      </Alert>
    );
  }
  return (
    <Form error={error} name={form} onSubmit={submit}>
      <Field
        component={Input}
        type="email"
        name="email"
        label="participants.email"
        required
      />
      <Button
        disabled={pristine}
        icon="key"
        loading={submitting}
        type="submit"
      >
        <Message name="participants.resetPassword" />
      </Button>
    </Form>
  );
};

ResetPasswordForm.propTypes = {
  error: FormGeneralError,
  form: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
};

ResetPasswordForm.defaultProps = {
  error: null,
  pristine: false,
  submitting: false,
  submitSucceeded: false,
};

export default ResetPasswordForm;
