import FontAwesome from 'react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

import { FormGeneralError } from '../../proptypes';

import Form from '../../forms/components/Form';
import Button from '../../components/Button';
import Input from '../../forms/components/Input';
import Link from '../../containers/Link';
import Message from '../../containers/Message';

const LoginForm = ({
  disabled,
  error,
  form,
  pristine,
  submitting,
  submit,
}) => (
  <Form error={error} name={form} onSubmit={submit}>
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
      <FontAwesome className="fa-fw" name="key" />
      {' '}
      <span>{<Message name="participants.forgottenPassword" />}</span>
    </Link>
  </Form>
);

LoginForm.propTypes = {
  disabled: PropTypes.bool,
  error: FormGeneralError,
  form: PropTypes.string.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  disabled: false,
  error: null,
  pristine: false,
  submitting: false,
};

export default LoginForm;
