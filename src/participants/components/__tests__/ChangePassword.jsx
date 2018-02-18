import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import ChangePassword from '../ChangePassword';


describe('Participant ChangePassword component', () => {
  it('renders', () => {
    const comp = shallow(
      <ChangePassword
        errors={{}}
        form="changePassword"
        onChange={() => {}}
        onSubmit={() => {}}
        translate={msg => msg}
        values={{
          oldPassword: 'oldPassword',
          newPassword: 'newPassword',
          newPasswordConfirm: 'newPasswordConfirm',
        }}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveLength(1);
    expect(comp.find('[name="newPassword"]')).toHaveLength(1);
    expect(comp.find('[name="newPasswordConfirm"]')).toHaveLength(1);
  });

  it('renders without old password input when given newPassword flag', () => {
    const comp = shallow(
      <ChangePassword
        errors={{}}
        form="changePassword"
        newPassword
        onChange={() => {}}
        onSubmit={() => {}}
        translate={msg => msg}
        values={{
          newPassword: 'newPassword',
          newPasswordConfirm: 'newPasswordConfirm',
        }}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveLength(0);
  });

  it('renders with errors', () => {
    const comp = shallow(
      <ChangePassword
        errors={{
          oldPassword: 'error1',
          newPassword: 'error2',
          newPasswordConfirm: 'error3',
        }}
        form="changePassword"
        onChange={() => {}}
        onSubmit={() => {}}
        submitErrors={[
          'foo',
        ]}
        translate={msg => msg}
        values={{
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        }}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveProp('error', 'error1');
    expect(comp.find('[name="newPassword"]')).toHaveProp('error', 'error2');
    expect(comp.find('[name="newPasswordConfirm"]')).toHaveProp('error', 'error3');
    expect(comp.find('Connect(FormErrors)')).toHaveLength(1);
  });

  it('renders disabled when loading', () => {
    const comp = shallow(
      <ChangePassword
        errors={{}}
        form="changePassword"
        loading
        onChange={() => {}}
        onSubmit={() => {}}
        translate={msg => msg}
        values={{
          oldPassword: 'oldPassword',
          newPassword: 'newPassword',
          newPasswordConfirm: 'newPasswordConfirm',
        }}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="newPassword"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="newPasswordConfirm"]')).toHaveProp('disabled', true);
  });

  it('triggers onChange with form, input and value', () => {
    const onChangeSpy = sinon.spy();
    const comp = shallow(
      <ChangePassword
        errors={{}}
        form="resetPassword"
        onChange={onChangeSpy}
        onSubmit={() => {}}
        translate={msg => msg}
        values={{ email: 'test@example.com' }}
      />
    );

    comp.find('Input').at(0).simulate('change', 'oldPassword', 'foo');
    expect(onChangeSpy.args).toEqual([
      ['resetPassword', 'oldPassword', 'foo'],
    ]);
  });

  it('triggers onSubmit with form', () => {
    const onSubmitSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const comp = shallow(
      <ChangePassword
        errors={{}}
        form="resetPassword"
        onChange={() => {}}
        onSubmit={onSubmitSpy}
        translate={msg => msg}
        values={{}}
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
