import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React, { Component, PropTypes } from 'react';
import { Creatable } from 'react-select';

import 'react-select/dist/react-select.css';

export default class Input extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, value);
    }
  }

  render() {
    const { help, label, name, ...other } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <Creatable
          {...other}
          name={name}
          onChange={this.handleChange}
        />
        {help ? <HelpBlock>{help}</HelpBlock> : null}
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}

Input.propTypes = {
  help: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
