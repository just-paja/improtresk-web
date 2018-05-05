import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

import { FormGeneralError } from '../../proptypes';

import Form from '../../forms/components/Form';
import Button from '../../components/Button';
import Input from '../../forms/components/Input';
import Link from '../../containers/Link';
import Message from '../../containers/Message';
import IconMessage from '../../components/IconMessage';

const LoginForm = ({
  disabled,
  form,
  pristine,
  submitting,
  submit,
  submitErrors,
}) => (
  <Form error={submitErrors} name={form} onSubmit={submit}>
    <Field
      component={Input}
      disabled={disabled || submitting}
      label="participants.email"
      name="email"
      type="email"
    />
    <Field
      component={Input}
      disabled={disabled || submitting}
      label="participants.password"
      name="password"
      type="password"
    />
    <Button
      disabled={disabled || pristine}
      icon="sign-in"
      loading={submitting}
      type="submit"
    >
      <Message name="participants.login" />
    </Button>
    <Link className="pull-right" to="participantForgottenPassword">
      <IconMessage icon="key" name="participants.forgottenPassword" />
    </Link>
  </Form>
);

LoginForm.propTypes = {
  disabled: PropTypes.bool,
  form: PropTypes.string.isRequired,
  pristine: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  submitErrors: FormGeneralError,
  submitting: PropTypes.bool,
};

LoginForm.defaultProps = {
  disabled: false,
  pristine: false,
  submitErrors: null,
  submitting: false,
};

export default LoginForm;
