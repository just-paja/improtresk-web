import Label from 'reactstrap/lib/Label';
import InputControl from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import FormText from 'reactstrap/lib/FormText';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    return (
      <FormGroup>
        <Label>{label}</Label>
        <InputControl
          {...other}
          className={error ? 'is-invalid' : null}
          maxLength={maxLength}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          type={type}
          value={value || ''}
          invalid={error || undefined}
        />
        {touched && error ? <FormFeedback>{error}</FormFeedback> : null}
        {help ? <FormText>{help}</FormText> : null}
      </FormGroup>
    );
  }
}

Input.propTypes = {
  changeLeadsToTouch: PropTypes.bool,
  Control: PropTypes.func,
  error: PropTypes.string,
  formatValue: PropTypes.func,
  help: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.node,
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
  Control: Input,
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
