import FormFeedback from 'reactstrap/lib/FormFeedback';
import FormGroup from 'reactstrap/lib/FormGroup';
import FormText from 'reactstrap/lib/FormText';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Children } from '../../proptypes';

export default class InputRadio extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ touched: true });
    this.props.onChange(
      this.props.name,
      this.props.autoValue ? !!e.target.checked : this.props.value
    );
  }

  isTouched() {
    return !!(this.props.touched || this.state.touched);
  }

  render() {
    const {
      autoValue,
      checked,
      error,
      help,
      label,
      name,
      value,
      ...other
    } = this.props;

    const touched = this.isTouched();

    delete other.touched;

    return (
      <FormGroup>
        <Label>
          <Input
            {...other}
            checked={autoValue ? !!value : checked}
            name={name}
            onChange={this.handleChange}
            type="radio"
          />
          {label}
        </Label>
        {touched && error ? <FormFeedback>{error}</FormFeedback> : null}
        {help ? <FormText>{help}</FormText> : null}
      </FormGroup>
    );
  }
}

InputRadio.propTypes = {
  autoValue: PropTypes.bool,
  error: PropTypes.string,
  help: Children,
  label: Children,
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  touched: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
};

InputRadio.defaultProps = {
  autoValue: true,
  checked: null,
  error: null,
  help: null,
  label: null,
  onBlur: null,
  onChange: null,
  touched: false,
  value: null,
};
