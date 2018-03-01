import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import Input from '../Input';

describe('Input component', () => {
  it('renders as text input', () => {
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
      />
    );
    expect(comp.find('Input')).toHaveProp('type', 'text');
  });

  it('replaces blank values as empty string', () => {
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
        value={null}
      />
    );
    expect(comp.find('Input')).toHaveProp('value', '');
  });

  it('renders as email input with help', () => {
    const comp = shallow(
      <Input
        help="This is the input help!"
        label="Input label"
        name="text-input"
        type="email"
      />
    );
    expect(comp.find('Input')).toHaveProp('type', 'email');
  });

  it('renders in touched error state', () => {
    const comp = shallow(
      <Input
        help="This is the input help!"
        error="This is the input error!"
        label="Input label"
        name="text-input"
        touched
      />
    );

    expect(comp.find({
      children: 'This is the input error!',
    })).toHaveLength(1);
  });

  it('onChange on input value change does not fail when without args', () => {
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
      />
    );

    expect(() => comp.find('Input').simulate('change')).not.toThrow();
  });

  it('triggers onChange on input value change when passed', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('Input').simulate('change', {
      target: {
        name: 'text-input',
        value: 'foo',
      },
    });

    expect(changeSpy.args).toEqual([
      ['text-input', 'foo'],
    ]);
  });

  it('triggers onChange on input value change when passed with no target input', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('Input').simulate('change', 'foo');
    expect(changeSpy.args).toEqual([
      ['text-input', 'foo'],
    ]);
  });

  it('triggers onChange on input value change when passed with formatValue prop', () => {
    const changeSpy = sinon.spy();
    const valueSpy = sinon.stub();
    valueSpy.returns('bar');
    const comp = shallow(
      <Input
        formatValue={valueSpy}
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('Input').simulate('change', 'foo');
    expect(valueSpy.args).toEqual([['foo']]);
    expect(changeSpy.args).toEqual([
      ['text-input', 'bar'],
    ]);
  });

  it('triggers touch state on input value change when passed changeLeadsToTouch', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        changeLeadsToTouch
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('Input').simulate('change', 'foo');
    expect(comp.instance().state).toEqual({
      changed: true,
      touched: true,
    });
  });

  it('triggers touch state on input blur when input was changed', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        changeLeadsToTouch
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.setState({ changed: true });

    comp.find('Input').simulate('blur');
    expect(comp.instance().state).toEqual({
      changed: true,
      touched: true,
    });
  });

  it('triggers onBlur on blur', () => {
    const blurSpy = sinon.spy();
    const comp = shallow(
      <Input
        changeLeadsToTouch
        label="Input label"
        name="text-input"
        onBlur={blurSpy}
      />
    );

    comp.setState({ changed: true });
    comp.find('Input').simulate('blur');
    expect(blurSpy.calledOnce).toBe(true);
  });
});
