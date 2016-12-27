import React from 'react';
import { Creatable } from 'react-select';

import 'react-select/dist/react-select.css';

import Input from './input';


const InputSelect = props => (
  <Input
    Control={Creatable}
    {...props}
  />
);

export default InputSelect;
