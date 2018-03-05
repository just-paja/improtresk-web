import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import ResetPassword from '../ResetPassword';

describe('ResetPassword component', () => {
  it('renders email input', () => {
    const comp = shallow(
      <ResetPassword
        translate={msg => msg}
        formData={{
          fieldErrors: {},
          formName: 'resetPassword',
          values: { email: 'test@example.com' },
        }}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(comp.find('[name="email"]')).toHaveLength(1);
  });

  it('renders with errors', () => {
    const comp = shallow(
      <ResetPassword
        translate={msg => msg}
        formData={{
          fieldErrors: {
            email: 'Unknown e-mail',
          },
          formName: 'resetPassword',
          values: { email: 'test@example.com' },
        }}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(comp.find('[name="email"]')).toHaveProp('error', 'Unknown e-mail');
  });

  it('renders inputs disabled when loading', () => {
    const comp = shallow(
      <ResetPassword
        translate={msg => msg}
        formData={{
          loading: true,
          fieldErrors: {},
          formName: 'resetPassword',
          values: { email: 'test@example.com' },
        }}
        loading
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(comp.find('[name="email"]')).toHaveProp('disabled', true);
    expect(comp.find('Button')).toHaveProp('loading', true);
  });

  it('triggers onChange with form, input and value', () => {
    const onChangeSpy = sinon.spy();
    const comp = shallow(
      <ResetPassword
        translate={msg => msg}
        formData={{
          fieldErrors: {},
          formName: 'resetPassword',
          values: { email: 'test@example.com' },
        }}
        onChange={onChangeSpy}
        onSubmit={() => {}}
      />
    );

    comp.find('Input').simulate('change', 'email', 'test@example.com');
    expect(onChangeSpy.args).toEqual([
      ['resetPassword', 'email', 'test@example.com'],
    ]);
  });

  it('triggers onSubmit with form', () => {
    const onSubmitSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const comp = shallow(
      <ResetPassword
        translate={msg => msg}
        formData={{
          loading: true,
          fieldErrors: {},
          formName: 'resetPassword',
          values: { email: 'test@example.com' },
        }}
        onChange={() => {}}
        onSubmit={onSubmitSpy}
      />
    );

    comp.simulate('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(onSubmitSpy.args).toEqual([
      ['resetPassword'],
    ]);
    expect(preventDefaultSpy.calledOnce).toBe(true);
  });
});
