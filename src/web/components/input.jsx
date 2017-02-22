import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleBlur() {
    this.setState({ touched: this.state.changed });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  handleChange(e) {
    this.setState({ changed: true });

    if (this.props.changeLeadsToTouch) {
      this.setState({ touched: true });
    }

    if (this.props.onChange) {
      const value = e.target ? e.target.value : e;
      const formattedValue = this.props.formatValue ? this.props.formatValue(value) : value;
      this.props.onChange(this.props.name, formattedValue);
    }
  }

  isTouched() {
    return !!(this.props.touched || this.state.touched);
  }

  render() {
    const {
      Control,
      error,
      help,
      label,
      maxLength,
      name,
      type,
      value,
      ...other
    } = this.props;

    delete other.changeLeadsToTouch;
    delete other.formatValue;
    delete other.touched;

    const touched = this.isTouched();
    const message = (touched && error) || help;

    return (
      <FormGroup validationState={(touched && error) ? 'error' : null}>
        <ControlLabel>{label}</ControlLabel>
        <Control
          {...other}
          maxLength={maxLength}
          name={name}
          onBlur={this.handleBlur}
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
  changeLeadsToTouch: PropTypes.bool,
  Control: PropTypes.func.isRequired,
  error: PropTypes.string,
  formatValue: PropTypes.func,
  help: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  touched: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

Input.defaultProps = {
  changeLeadsToTouch: false,
  Control: FormControl,
  error: null,
  formatValue: null,
  help: null,
  label: null,
  onBlur: null,
  onChange: null,
  maxLength: 255,
  touched: false,
  type: 'text',
  value: null,
};
