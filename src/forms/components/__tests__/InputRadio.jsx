import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import InputRadio from '../InputRadio';

describe('InputRadio component', () => {
  it('renders radio component', () => {
    const comp = shallow(
      <InputRadio
        label="Input label"
        name="test-input"
      />
    );
    expect(comp.find('Input[type="radio"]')).toHaveLength(1);
  });

  it('renders help message', () => {
    const comp = shallow(
      <InputRadio
        help="foo"
        label="Input label"
        name="test-input"
      />
    );
    expect(comp.find({
      children: 'foo',
    })).toHaveLength(1);
  });

  it('renders input component in non-error state when not touched', () => {
    const comp = shallow(
      <InputRadio
        error="foo"
        label="Input label"
        name="test-input"
      />
    );
    expect(comp.find('FormGroup').prop('validationState')).toBe(null);
  });

  it('renders input component in error state', () => {
    const comp = shallow(
      <InputRadio
        error="foo"
        label="Input label"
        name="test-input"
        touched
      />
    );
    expect(comp.find('FormGroup').prop('validationState')).toBe('error');
  });

  it('triggers onChange with input name and value', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <InputRadio
        error="foo"
        label="Input label"
        name="test-input"
        onChange={changeSpy}
      />
    );

    comp.find('Input[type="radio"]').simulate('change', { target: { checked: true } });
    expect(changeSpy.args).toEqual([
      ['test-input', true],
    ]);
  });

  it('triggers onChange with passed value given autoValue is false', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <InputRadio
        autoValue={false}
        error="foo"
        label="Input label"
        name="test-input"
        onChange={changeSpy}
        value={666}
      />
    );

    comp.find('Input[type="radio"]').simulate('change', { target: { checked: true } });
    expect(changeSpy.args).toEqual([
      ['test-input', 666],
    ]);
  });
});
