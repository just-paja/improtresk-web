import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import InputCheckbox from '../InputCheckbox';

describe('Input Checkbox component', () => {
  it('renders checkbox component', () => {
    const comp = shallow(
      <InputCheckbox
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        meta={{}}
      />
    );
    expect(comp.find('Input[type="checkbox"]')).toHaveLength(1);
  });

  it('renders label', () => {
    const comp = shallow(
      <InputCheckbox
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        meta={{
          form: 'testForm',
        }}
      />
    );
    expect(comp.find('Label')).toHaveProp('htmlFor', 'testForm.testInput');
    expect(comp.find('InputDescription[text="test.inputLabel"]')).toHaveLength(1);
  });

  it('renders help message when provided', () => {
    const comp = shallow(
      <InputCheckbox
        label="test.inputLabel"
        help="test.helpMessage"
        input={{
          name: 'testInput',
        }}
        meta={{}}
      />
    );
    expect(comp.find('InputDescription[text="test.helpMessage"]')).toHaveLength(1);
  });

  it('does not render error before touched', () => {
    const comp = shallow(
      <InputCheckbox
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        meta={{
          error: 'test.fieldError',
          touched: 0,
        }}
      />
    );
    expect(comp.find('Connect(FormErrors)')).toHaveLength(0);
  });

  it('renders in touched error state', () => {
    const comp = shallow(
      <InputCheckbox
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
      />
    );
    expect(comp.find('Connect(FormErrors)')).toHaveLength(1);
  });

  it('triggers onChange on input value change', () => {
    const onChange = sinon.spy();
    const comp = shallow(
      <InputCheckbox
        input={{
          name: 'testInput',
          onChange,
        }}
        label="test.inputLabel"
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
      />
    );
    comp.find('Input').simulate('change', {
      target: {
        name: 'text-input',
        value: 'foo',
      },
    });

    expect(onChange.getCall(0).args).toEqual([
      {
        target: {
          name: 'text-input',
          value: 'foo',
        },
      },
    ]);
  });

  it('triggers onBlur on input value change', () => {
    const onBlur = sinon.spy();
    const comp = shallow(
      <InputCheckbox
        input={{
          name: 'testInput',
          onBlur,
        }}
        label="test.inputLabel"
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
      />
    );
    comp.find('Input').simulate('blur', {
      target: {
        name: 'text-input',
        value: 'foo',
      },
    });

    expect(onBlur.getCall(0).args).toEqual([
      {
        target: {
          name: 'text-input',
          value: 'foo',
        },
      },
    ]);
  });

  it('triggers onFocus on input value change', () => {
    const onFocus = sinon.spy();
    const comp = shallow(
      <InputCheckbox
        input={{
          name: 'testInput',
          onFocus,
        }}
        label="test.inputLabel"
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
      />
    );
    comp.find('Input').simulate('focus', {
      target: {
        name: 'text-input',
        value: 'foo',
      },
    });

    expect(onFocus.getCall(0).args).toEqual([
      {
        target: {
          name: 'text-input',
          value: 'foo',
        },
      },
    ]);
  });
});
