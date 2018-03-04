import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import Login from '../Login';

describe('Login Form component', () => {
  it('renders email and password input', () => {
    const comp = shallow(
      <Login
        formData={{
          formName: 'signup',
          fieldErrors: {
            email: 'email error',
            password: 'password error',
          },
          values: {
            email: 'email value',
            password: 'test',
          },
        }}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(comp.find('[name="email"]')).toHaveLength(1);
    expect(comp.find('[name="password"]')).toHaveLength(1);
  });

  it('renders inputs disabled when form is disabled', () => {
    const comp = shallow(
      <Login
        formData={{
          formName: 'signup',
          fieldErrors: {},
          values: {},
        }}
        onChange={() => {}}
        onSubmit={() => {}}
        disabled
      />
    );
    expect(comp.find('[name="email"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="password"]')).toHaveProp('disabled', true);
  });

  it('injects form name into onChange', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Login
        formData={{
          formName: 'signup',
          fieldErrors: {},
          values: {},
        }}
        onChange={changeSpy}
        onSubmit={() => {}}
      />
    );

    comp.find('Input').at(0).simulate('change', 'name', 'foo');
    expect(changeSpy.args).toEqual([
      ['signup', 'name', 'foo'],
    ]);
  });

  it('triggers onSubmit on form submit', () => {
    const preventDefaultSpy = sinon.spy();
    const submitSpy = sinon.spy();
    const comp = shallow(
      <Login
        formData={{
          formName: 'signup',
          fieldErrors: {},
          values: {},
        }}
        onChange={() => {}}
        onSubmit={submitSpy}
      />
    );

    comp.simulate('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(submitSpy.args).toEqual([
      ['signup'],
    ]);
    expect(preventDefaultSpy.calledOnce).toBe(true);
  });
});
