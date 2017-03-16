import Radio from 'react-bootstrap/lib/Radio';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React, { Component, PropTypes } from 'react';

export default class InputRadio extends Component {
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
    const message = (touched && error) || help;

    delete other.touched;

    return (
      <FormGroup validationState={(touched && error) ? 'error' : null}>
        <Radio
          {...other}
          checked={!!value}
          name={name}
          onChange={this.handleChange}
        >{label}</Radio>
        {message ? <HelpBlock>{message}</HelpBlock> : null}
      </FormGroup>
    );
  }
}

InputRadio.propTypes = {
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

InputRadio.defaultProps = {
  error: null,
  help: null,
  label: null,
  onBlur: null,
  onChange: null,
  touched: false,
  value: null,
};
