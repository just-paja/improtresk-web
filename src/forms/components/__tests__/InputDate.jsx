import React from 'react';

import { shallow } from 'enzyme';

import InputDate from '../InputDate';

describe('Input Date component', () => {
  it('renders input component', () => {
    const comp = shallow(
      <InputDate
        label="Input label"
        name="text-input"
        onChange={() => {}}
      />
    );
    expect(comp.find('Input')).toHaveLength(1);
  });
});
