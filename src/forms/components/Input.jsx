import Label from 'reactstrap/lib/Label'
import InputControl from 'reactstrap/lib/Input'
import FormGroup from 'reactstrap/lib/FormGroup'
import FormText from 'reactstrap/lib/FormText'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import React from 'react'
import PropTypes from 'prop-types'

import FormErrors from '../containers/FormErrors'
import InputDescription from './InputDescription'

const Input = ({
  currentLanguage,
  disabled,
  dispatch,
  help,
  input,
  label,
  meta,
  ...other
}) => (
  <FormGroup>
    {label ? (
      <Label htmlFor={input.name}>
        <InputDescription text={label} />
      </Label>
    ) : null}
    <InputControl
      className={meta.touched && meta.error ? 'is-invalid' : null}
      disabled={disabled || meta.submitting}
      name={input.name}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
      {...other}
    />
    {meta.touched && meta.error ? (
      <FormFeedback>
        <FormErrors
          errors={meta.error}
          label={label}
          data={{
            field: input.name
          }}
        />
      </FormFeedback>
    ) : null}
    {help ? (
      <FormText>
        <InputDescription text={help} />
      </FormText>
    ) : null}
  </FormGroup>
)

Input.propTypes = {
  currentLanguage: PropTypes.string,
  disabled: PropTypes.bool,
  dispatch: PropTypes.func,
  help: PropTypes.node,
  input: PropTypes.object.isRequired,
  label: PropTypes.node,
  meta: PropTypes.object.isRequired
}

Input.defaultProps = {
  currentLanguage: null,
  disabled: false,
  dispatch: null,
  help: null,
  label: null
}

export default Input
