import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'redux-form'
import { Translate } from 'react-localize-redux'

import { FormGeneralError } from '../../proptypes'

import Button from '../../components/Button'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import InputSelect from '../../forms/components/InputSelect'

const ParticipantEditForm = ({
  error,
  form,
  pristine,
  submit,
  submitting,
  teams
}) => (
  <Form error={error} name={form} onSubmit={submit}>
    <Field
      name='name'
      component={Input}
      disabled={submitting}
      help='participants.fullNameHelp'
      label='participants.fullName'
    />
    <Field
      component={InputSelect}
      disabled={submitting}
      help='participants.teamHelp'
      label='participants.team'
      name='team_name'
      options={teams}
      simpleValue
    />
    <Field
      component={Input}
      disabled={submitting}
      help='participants.emailHelp'
      label='participants.email'
      name='email'
      type='email'
    />
    <Field
      component={Input}
      disabled={submitting}
      help='participants.phoneNumberHelp'
      label='participants.phoneNumber'
      name='phone'
      placeholder='000000000'
    />
    <Button
      disabled={pristine}
      icon='floppy-o'
      loading={submitting}
      type='submit'
    >
      <Translate id='participants.saveChanges' />
    </Button>
  </Form>
)

ParticipantEditForm.propTypes = {
  error: FormGeneralError,
  form: PropTypes.string.isRequired,
  pristine: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired
}

ParticipantEditForm.defaultProps = {
  error: null,
  pristine: false,
  submitting: false
}

export default ParticipantEditForm
