import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import InputCheckbox from '../InputCheckbox';

describe('Input Checkbox component', () => {
  it('renders checkbox component', () => {
    const comp = shallow(
      <InputCheckbox
        label="Input label"
        name="test-input"
      />
    );
    expect(comp.find('Input[type="checkbox"]')).toHaveLength(1);
  });

  it('renders input component with help message', () => {
    const comp = shallow(
      <InputCheckbox
        help="This is help text"
        label="Input label"
        name="test-input"
      />
    );
    expect(comp.find({ children: 'This is help text' })).toHaveLength(1);
  });

  it('renders input component in non-error state when not touched', () => {
    const comp = shallow(
      <InputCheckbox
        error="This is the input error!"
        label="Input label"
        name="test-input"
      />
    );
    expect(comp.find('FormGroup')).not.toHaveProp('validationState', 'error');
    expect(comp.find({
      children: 'This is the input error!',
    })).toHaveLength(0);
  });

  it('renders input component in error state', () => {
    const comp = shallow(
      <InputCheckbox
        error="This is the input error!"
        label="Input label"
        name="test-input"
        touched
      />
    );
    expect(comp.find('FormGroup')).toHaveProp('validationState', 'error');
    expect(comp.find({
      children: 'This is the input error!',
    })).toHaveLength(1);
  });

  it('triggers onChange with input name and value', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <InputCheckbox
        error="foo"
        label="Input label"
        name="test-input"
        onChange={changeSpy}
      />
    );

    comp.find('Input[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(changeSpy.args).toEqual([
      ['test-input', true],
    ]);
  });
});
