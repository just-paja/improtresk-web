import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React, { Component, PropTypes } from 'react';

export default class InputCheckbox extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(this.props.name, !!e.target.checked);
  }

  render() {
    const {
      error,
      help,
      label,
      name,
      ...other
    } = this.props;
    const message = error || help;

    return (
      <FormGroup validationState={error ? 'error' : null}>
        <Checkbox
          {...other}
          name={name}
          onChange={this.handleChange}
        >{label}</Checkbox>
        {message ? <HelpBlock>{message}</HelpBlock> : null}
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

InputCheckbox.defaultProps = {
  error: null,
};
