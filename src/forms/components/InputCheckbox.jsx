import FormFeedback from 'reactstrap/lib/FormFeedback';
import FormGroup from 'reactstrap/lib/FormGroup';
import FormText from 'reactstrap/lib/FormText';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import PropTypes from 'prop-types';
import React from 'react';

import FormErrors from '../containers/FormErrors';
import InputDescription from './InputDescription';

const InputCheckbox = ({
  disabled,
  help,
  input,
  label,
  meta,
  rawLabel,
  ...other
}) => (
  <FormGroup>
    <Input
      className={meta.error ? 'is-invalid' : null}
      name={input.name}
      id={`${meta.form}.${input.name}`}
      onBlur={input.onBlur}
      onChange={input.onChange}
      onFocus={input.onFocus}
      type="checkbox"
      value={input.value}
      {...other}
    />
    <Label htmlFor={`${meta.form}.${input.name}`}>
      <InputDescription rawLabel={rawLabel} text={label} />
    </Label>
    {meta.touched && meta.error ? (
      <FormFeedback>
        <FormErrors
          errors={meta.error}
          label={label}
          rawLabel={rawLabel}
          data={{
            field: input.name,
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
);

InputCheckbox.propTypes = {
  disabled: PropTypes.bool,
  rawLabel: PropTypes.bool,
  help: PropTypes.node,
  input: PropTypes.object.isRequired,
  label: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
};

InputCheckbox.defaultProps = {
  disabled: false,
  help: null,
  rawLabel: false,
};

export default InputCheckbox;
