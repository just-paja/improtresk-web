import Alert from 'reactstrap/lib/Alert'
import PropTypes from 'prop-types'
import React from 'react'

import { Field } from 'redux-form'

import { FormGeneralError, Meal } from '../../proptypes'

import Button from '../../components/Button'
import Form from '../../forms/components/Form'
import Message from '../../containers/Message'
import FoodPicker from './FoodPicker'

const FoodForm = ({
  error,
  form,
  meals,
  pristine,
  submit,
  submitting
}) => {
  if (meals.length === 0) {
    return (
      <Alert>
        <Message name='orders.foodChoicesEmpty' />
      </Alert>
    )
  }
  return (
    <Form error={error} name={form} onSubmit={submit}>
      <Field
        component={FoodPicker}
        meals={meals}
        name='food'
      />
      <Button
        disabled={pristine}
        type='submit'
        loading={submitting}
      >
        <Message name='orders.foodSave' />
      </Button>
    </Form>
  )
}

FoodForm.propTypes = {
  error: FormGeneralError,
  form: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(Meal).isRequired,
  pristine: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
}

FoodForm.defaultProps = {
  error: null,
  pristine: false,
  submitting: false
}

export default FoodForm
