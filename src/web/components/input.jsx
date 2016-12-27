import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.name, e.target.value);
    }
  }

  render() {
    const { error, help, label, maxLength, name, type, value, ...other } = this.props;
    const message = error || help;

    return (
      <FormGroup validationState={error ? 'error' : null}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          {...other}
          maxLength={maxLength}
          name={name}
          onChange={this.handleChange}
          type={type}
          value={value || ''}
        />
        {message ? <HelpBlock>{message}</HelpBlock> : null}
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}

Input.propTypes = {
  error: PropTypes.string,
  help: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  error: null,
  maxLength: 255,
  type: 'text',
};
