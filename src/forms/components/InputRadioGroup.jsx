import FormFeedback from 'reactstrap/lib/FormFeedback'
import FormGroup from 'reactstrap/lib/FormGroup'
import FormText from 'reactstrap/lib/FormText'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InputRadio from './InputRadio'

import { Children, Options } from '../../proptypes'

export default class InputRadioGroup extends Component {
  constructor () {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (name, value) {
    this.setState({ touched: true })
    this.props.onChange(this.props.name, value)
  }

  isTouched () {
    return !!(this.props.touched || this.state.touched)
  }

  render () {
    const {
      defaultLabel,
      error,
      help,
      label,
      name,
      options,
      required,
      value,
      ...other
    } = this.props

    const touched = this.isTouched()
    delete other.touched

    return (
      <FormGroup validationState={(touched && error) ? 'error' : null}>
        <strong>{label}</strong>
        {!required ? (
          <InputRadio
            autoValue={false}
            checked={value === null}
            label={defaultLabel}
            name={name}
            onChange={this.handleChange}
            value={null}
          />
        ) : null}
        {options.map(option => (
          <InputRadio
            autoValue={false}
            checked={value === option.id}
            key={option.id}
            label={option.name}
            name={name}
            onChange={this.handleChange}
            value={option.id}
          />
        ))}
        {touched && error ? <FormFeedback>{error}</FormFeedback> : null}
        {help ? <FormText>{help}</FormText> : null}
      </FormGroup>
    )
  }
}

InputRadioGroup.propTypes = {
  defaultLabel: PropTypes.string,
  error: PropTypes.string,
  help: Children,
  label: Children,
  name: PropTypes.string.isRequired,
  options: Options.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ])
}

InputRadioGroup.defaultProps = {
  defaultLabel: null,
  error: null,
  help: null,
  label: null,
  onBlur: null,
  onChange: null,
  required: false,
  touched: false,
  value: null
}
