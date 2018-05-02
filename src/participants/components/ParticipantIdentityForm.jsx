import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';
import { Translate } from 'react-localize-redux';

import { FormGeneralError } from '../../proptypes';

import Button from '../../components/Button';
import Form from '../../forms/components/Form';
import Input from '../../forms/components/Input';

const ParticipantIdentityForm = ({
  form,
  pristine,
  submit,
  submitErrors,
  submitting,
}) => (
  <Form error={submitErrors} name={form} onSubmit={submit}>
    <Field
      component={Input}
      label="participants.address"
      name="address"
      required
    />
    <Field
      component={Input}
      label="participants.idNumber"
      name="idNumber"
      placeholder="000000000"
      required
    />
    <Button
      disabled={pristine}
      icon="floppy-o"
      loading={submitting}
      type="submit"
    >
      <Translate id="participants.saveChanges" />
    </Button>
  </Form>
);

ParticipantIdentityForm.propTypes = {
  form: PropTypes.string.isRequired,
  pristine: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  submitErrors: FormGeneralError,
  submitting: PropTypes.bool,
};

ParticipantIdentityForm.defaultProps = {
  submitErrors: null,
  pristine: false,
  submitting: false,
};

export default ParticipantIdentityForm;
