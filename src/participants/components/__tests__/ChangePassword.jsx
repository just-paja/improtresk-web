import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import ChangePassword from '../ChangePassword';

const MockSuccessComponent = () => <div />;

describe('Participant ChangePassword component', () => {
  it('renders', () => {
    const comp = shallow(
      <ChangePassword
        formData={{
          fieldErrors: {},
          formName: 'changePassword',
          values: {
            oldPassword: 'oldPassword',
            newPassword: 'newPassword',
            newPasswordConfirm: 'newPasswordConfirm',
          },
        }}
        onChange={() => {}}
        onSubmit={() => {}}
        onUnmount={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveLength(1);
    expect(comp.find('[name="newPassword"]')).toHaveLength(1);
    expect(comp.find('[name="newPasswordConfirm"]')).toHaveLength(1);
  });

  it('renders without old password input when given newPassword flag', () => {
    const comp = shallow(
      <ChangePassword
        formData={{
          fieldErrors: {},
          formName: 'changePassword',
          values: {
            newPassword: 'newPassword',
            newPasswordConfirm: 'newPasswordConfirm',
          },
        }}
        newPassword
        onChange={() => {}}
        onSubmit={() => {}}
        onUnmount={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveLength(0);
  });

  it('renders with errors', () => {
    const comp = shallow(
      <ChangePassword
        formData={{
          fieldErrors: {
            oldPassword: 'error1',
            newPassword: 'error2',
            newPasswordConfirm: 'error3',
          },
          formName: 'changePassword',
          submitErrors: [
            'foo',
          ],
          values: {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
          },
        }}
        onChange={() => {}}
        onSubmit={() => {}}
        onUnmount={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
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
        formData={{
          fieldErrors: {},
          formName: 'changePassword',
          loading: true,
          values: {
            oldPassword: 'oldPassword',
            newPassword: 'newPassword',
            newPasswordConfirm: 'newPasswordConfirm',
          },
        }}
        onChange={() => {}}
        onSubmit={() => {}}
        onUnmount={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
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
        formData={{
          fieldErrors: {},
          formName: 'resetPassword',
          values: { email: 'test@example.com' },
        }}
        onChange={onChangeSpy}
        onSubmit={() => {}}
        onUnmount={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
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
        formData={{
          fieldErrors: {},
          formName: 'resetPassword',
          values: {},
        }}
        onChange={() => {}}
        onSubmit={onSubmitSpy}
        onUnmount={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
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

  it('triggers onUnmount on unmount', () => {
    const onUnmount = sinon.spy();
    const comp = shallow(
      <ChangePassword
        formData={{
          fieldErrors: {},
          formName: 'resetPassword',
          values: {},
        }}
        onChange={() => {}}
        onSubmit={() => {}}
        onUnmount={onUnmount}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );

    comp.unmount();
    expect(onUnmount.calledOnce).toBe(true);
    expect(onUnmount.getCall(0).args).toEqual(['resetPassword']);
  });
});
