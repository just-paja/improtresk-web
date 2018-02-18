import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import InputRadioGroup from '../InputRadioGroup';

describe('InputRadioGroup component', () => {
  it('renders passed option as radio inputs', () => {
    const comp = shallow(
      <InputRadioGroup
        label="Input label"
        name="test-input"
        options={[
          {
            id: 100,
            name: 'foo',
          },
        ]}
        required
      />
    );
    expect(comp.find('InputRadio')).toHaveProp('value', 100);
    expect(comp.find('InputRadio')).toHaveProp('label', 'foo');
  });

  it('renders selected option', () => {
    const comp = shallow(
      <InputRadioGroup
        label="Input label"
        name="test-input"
        options={[
          {
            id: 100,
            name: 'foo',
          },
          {
            id: 999,
            name: 'foo',
          },
        ]}
        required
        value={999}
      />
    );
    expect(comp.find('InputRadio[value=100]')).toHaveProp('checked', false);
    expect(comp.find('InputRadio[value=999]')).toHaveProp('checked', true);
  });

  it('renders default option when not required', () => {
    const comp = shallow(
      <InputRadioGroup
        defaultLabel="forms.default"
        label="Input label"
        name="test-input"
        options={[]}
      />
    );
    expect(comp.find('InputRadio')).toHaveProp('value', null);
    expect(comp.find('InputRadio')).toHaveProp('label', 'forms.default');
  });

  it('does not render default option when required', () => {
    const comp = shallow(
      <InputRadioGroup
        defaultLabel="forms.default"
        label="Input label"
        name="test-input"
        options={[]}
        required
      />
    );
    expect(comp.find('InputRadio')).toHaveLength(0);
  });

  it('renders help message when passed', () => {
    const comp = shallow(
      <InputRadioGroup
        help="foo"
        label="Input label"
        options={[]}
        name="test-input"
      />
    );
    expect(comp.find({
      children: 'foo',
    })).toHaveLength(1);
  });

  it('renders without help block when help is ommited', () => {
    const comp = shallow(
      <InputRadioGroup
        label="Input label"
        name="test-input"
        options={[]}
      />
    );
    expect(comp.find('HelpBlock')).toHaveLength(0);
  });

  it('renders in error state', () => {
    const comp = shallow(
      <InputRadioGroup
        error="This is the error message!"
        label="Input label"
        name="test-input"
        options={[]}
        touched
      />
    );
    expect(comp.find('FormGroup').prop('validationState')).toBe('error');
    expect(comp.find({ children: 'This is the error message!' })).toHaveLength(1);
  });

  it('triggers onChange with input name and value', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <InputRadioGroup
        error="foo"
        label="Input label"
        name="test-input"
        onChange={changeSpy}
        options={[
          {
            id: 100,
            name: 'foo',
          },
        ]}
      />
    );

    comp.find('InputRadio[value=100]').simulate('change', 'test-input', 100);
    expect(changeSpy.args).toEqual([
      ['test-input', 100],
    ]);
  });
});
