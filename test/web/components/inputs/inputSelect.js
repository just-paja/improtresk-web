import React from 'react';

import { Creatable } from 'react-select';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Input from '../../../../src/web/components/inputs/input';
import InputSelect from '../../../../src/web/components/inputs/inputSelect';

describe('Input Select component', () => {
  it('renders input component', () => {
    expect(shallow(
      <InputSelect
        label="Input label"
        name="text-input"
      />
    ).node).to.eql(
      <Input
        Control={Creatable}
        label="Input label"
        name="text-input"
      />
    );
  });
});
