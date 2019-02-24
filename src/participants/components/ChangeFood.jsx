import Form from 'reactstrap/lib/Form'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import Link from '../../containers/Link'
import FormErrors from '../../forms/containers/FormErrors'
import FoodPicker from '../../orders/components/FoodPicker'

export default class ChangeFood extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (input, value) {
    this.props.onChange(this.props.form, input, value)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.props.form)
  }

  render () {
    const {
      errors,
      loading,
      meals,
      submitErrors,
      submitted,
      values
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <FoodPicker
          disabled={loading}
          name='workshop'
          onChange={this.handleChange}
          error={errors.workshop}
          meals={meals}
          touched={submitted}
          value={values}
        />
        <FormErrors errors={submitErrors} />
        <Link to='participantHome'>
          <Button icon='ban'>Zrušit změnu</Button>
        </Link>
        <Button
          color='primary'
          className='pull-right'
          loading={loading}
          type='submit'
        >
          Vybrat jídlo
        </Button>
      </Form>
    )
  }
}

ChangeFood.propTypes = {
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
  values: PropTypes.shape({
    email: PropTypes.string
  }).isRequired
}

ChangeFood.defaultProps = {
  loading: false,
  submitErrors: null,
  submitted: false
}
