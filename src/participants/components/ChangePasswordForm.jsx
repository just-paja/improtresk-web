import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'redux-form'
import { Translate } from 'react-localize-redux'

import { FormGeneralError } from '../../proptypes'

import Button from '../../components/Button'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'

const ChangePasswordForm = ({
  error,
  form,
  newPassword,
  pristine,
  submit,
  submitSucceeded,
  submitting,
  successComponent: SuccessComponent
}) => {
  if (submitSucceeded) {
    return <SuccessComponent />
  }

  return (
    <Form error={error} name={form} onSubmit={submit}>
      {newPassword ? null : (
        <Field
          component={Input}
          name='oldPassword'
          type='password'
          label='participants.oldPassword'
        />
      )}
      <Field
        component={Input}
        name='newPassword'
        type='password'
        label='participants.newPassword'
      />
      <Field
        component={Input}
        name='newPasswordConfirm'
        type='password'
        label='participants.newPasswordCheck'
      />
      <Button
        disabled={pristine}
        icon='key'
        loading={submitting}
        type='submit'
      >
        <Translate id='participants.changePassword' />
      </Button>
    </Form>
  )
}

ChangePasswordForm.propTypes = {
  error: FormGeneralError,
  form: PropTypes.string.isRequired,
  newPassword: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  successComponent: PropTypes.func.isRequired
}

ChangePasswordForm.defaultProps = {
  error: null,
  newPassword: false,
  pristine: false,
  submitSucceeded: false,
  submitting: false
}

export default ChangePasswordForm
