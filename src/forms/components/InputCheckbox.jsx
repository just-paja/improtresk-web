import FormFeedback from 'reactstrap/lib/FormFeedback';
import FormGroup from 'reactstrap/lib/FormGroup';
import FormText from 'reactstrap/lib/FormText';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class InputCheckbox extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ touched: true });
    this.props.onChange(this.props.name, !!e.target.checked);
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
            checked={!!value}
            type="checkbox"
            name={name}
            onChange={this.handleChange}
          />
          {label}
        </Label>
        {touched && error ? <FormFeedback>{error}</FormFeedback> : null}
        {help ? <FormText>{help}</FormText> : null}
      </FormGroup>
    );
  }
}

InputCheckbox.propTypes = {
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
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  touched: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
};

InputCheckbox.defaultProps = {
  error: null,
  help: null,
  label: null,
  onBlur: null,
  onChange: null,
  touched: false,
  value: null,
};
