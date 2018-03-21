import React from 'react';

import { Creatable } from 'react-select';
import { shallow } from 'enzyme';

import InputSelect from '../InputSelect';

describe('Input Select component', () => {
  it('renders input component', () => {
    const comp = shallow((
      <InputSelect
        label="Input label"
        input={{
          name: 'text-input',
        }}
        meta={{}}
      />
    ));
    expect(comp).toHaveProp('tag', Creatable);
  });
});
