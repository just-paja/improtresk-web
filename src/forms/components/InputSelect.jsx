import React from 'react';
import { Creatable } from 'react-select';

import 'react-select/dist/react-select.css';

import Input from './Input';

const InputSelect = props => (
  <Input
    tag={Creatable}
    {...props}
  />
);

InputSelect.defaultProps = {
  error: null,
  value: null,
};

export default InputSelect;
