import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Creatable } from 'react-select';

import 'react-select/dist/react-select.css';

import Input from '../components/Input';

export default class InputSelect extends Component {
  constructor() {
    super();
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    this.props.input.onBlur(this.props.input.value);
  }

  render() {
    return (
      <Input
        {...this.props}
        tag={Creatable}
        onBlur={this.handleBlur}
        value={{ value: this.props.input.value, label: this.props.input.value }}
      />
    );
  }
}

InputSelect.propTypes = {
  input: PropTypes.object.isRequired,
};
