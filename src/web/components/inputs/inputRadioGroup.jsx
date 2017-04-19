import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React, { Component, PropTypes } from 'react';

import InputRadio from './inputRadio';

export default class InputRadioGroup extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, value) {
    this.setState({ touched: true });
    this.props.onChange(this.props.name, value);
  }

  isTouched() {
    return !!(this.props.touched || this.state.touched);
  }

  render() {
    const {
      error,
      help,
      label,
      name,
      options,
      required,
      value,
      ...other
    } = this.props;

    const touched = this.isTouched();
    const message = (touched && error) || help;

    delete other.touched;

    return (
      <FormGroup validationState={(touched && error) ? 'error' : null}>
        <ControlLabel>{label}</ControlLabel>
        {!required ? (
          <InputRadio
            autoValue={false}
            label="Výchozí"
            name={name}
            value={null}
            checked={value === null}
            onChange={this.handleChange}
          />
        ) : null}
        {options.map(option => (
          <InputRadio
            autoValue={false}
            key={option.id}
            label={option.name}
            name={name}
            value={option.id}
            checked={value === option.id}
            onChange={this.handleChange}
          />
        ))}
        {message ? <HelpBlock>{message}</HelpBlock> : null}
      </FormGroup>
    );
  }
}

InputRadioGroup.propTypes = {
  error: PropTypes.string,
  help: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
};

InputRadioGroup.defaultProps = {
  error: null,
  help: null,
  label: null,
  onBlur: null,
  onChange: null,
  required: false,
  touched: false,
  value: null,
};
