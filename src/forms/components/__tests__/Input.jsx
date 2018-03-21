import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import Input from '../Input';

describe('Input component', () => {
  it('renders as text by default', () => {
    const comp = shallow(
      <Input
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        translate={() => {}}
        meta={{}}
      />
    );
    expect(comp.find('Input')).toHaveProp('type', 'text');
  });

  it('renders as overriden type', () => {
    const comp = shallow(
      <Input
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        meta={{}}
        translate={() => {}}
        type="email"
      />
    );
    expect(comp.find('Input')).toHaveProp('type', 'email');
  });

  it('does not render label by default', () => {
    const comp = shallow(
      <Input
        input={{
          name: 'testInput',
        }}
        meta={{}}
        translate={() => {}}
        type="email"
      />
    );
    expect(comp.find('Label')).toHaveLength(0);
  });

  it('renders label when provided', () => {
    const comp = shallow(
      <Input
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        meta={{}}
        translate={() => {}}
        type="email"
      />
    );
    expect(comp.find('Label')).toHaveProp('htmlFor', 'testInput');
    expect(comp.find('InputDescription[text="test.inputLabel"]')).toHaveLength(1);
  });

  it('renders help message when provided', () => {
    const comp = shallow(
      <Input
        help="test.helpMessage"
        label="test.inputLabel"
        input={{
          name: 'testInput',
        }}
        meta={{}}
        translate={() => {}}
        type="email"
      />
    );
    expect(comp.find('InputDescription[text="test.helpMessage"]')).toHaveLength(1);
  });

  it('does not render error before touched', () => {
    const comp = shallow(
      <Input
        input={{
          name: 'testInput',
        }}
        meta={{
          error: 'test.fieldError',
          touched: 0,
        }}
        translate={() => {}}
        type="email"
      />
    );
    expect(comp.find('Connect(Message)[name="test.fieldError"]')).toHaveLength(0);
  });

  it('renders in touched error state', () => {
    const comp = shallow(
      <Input
        input={{
          name: 'testInput',
        }}
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
        translate={() => {}}
        type="email"
      />
    );
    expect(comp.find('Connect(FormErrors)')).toHaveLength(1);
  });

  it('triggers onChange on input value change', () => {
    const onChange = sinon.spy();
    const comp = shallow(
      <Input
        input={{
          name: 'testInput',
          onChange,
        }}
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
        translate={() => {}}
        type="email"
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

  it('triggers onBlur on input blur event', () => {
    const onBlur = sinon.spy();
    const comp = shallow(
      <Input
        input={{
          name: 'testInput',
          onBlur,
        }}
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
        type="email"
        translate={() => {}}
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

  it('triggers onFocus on input focus event', () => {
    const onFocus = sinon.spy();
    const comp = shallow(
      <Input
        input={{
          name: 'testInput',
          onFocus,
        }}
        meta={{
          error: 'test.fieldError',
          touched: true,
        }}
        translate={() => {}}
        type="email"
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
