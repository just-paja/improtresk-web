import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import ChangePasswordForm from '../ChangePasswordForm';

const MockSuccessComponent = () => <div />;

describe('ChangePasswordForm component', () => {
  it('renders old password field', () => {
    const comp = shallow(
      <ChangePasswordForm
        form="changePassword"
        submit={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveLength(1);
  });

  it('renders new password field', () => {
    const comp = shallow(
      <ChangePasswordForm
        form="changePassword"
        submit={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );
    expect(comp.find('[name="newPassword"]')).toHaveLength(1);
  });

  it('renders new password confirm field', () => {
    const comp = shallow(
      <ChangePasswordForm
        form="changePassword"
        submit={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );
    expect(comp.find('[name="newPasswordConfirm"]')).toHaveLength(1);
  });

  it('renders without old password input when given newPassword flag', () => {
    const comp = shallow(
      <ChangePasswordForm
        form="changePassword"
        newPassword
        submit={() => {}}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );
    expect(comp.find('[name="oldPassword"]')).toHaveLength(0);
  });

  it('triggers submit with form', () => {
    const submit = sinon.spy();
    const comp = shallow(
      <ChangePasswordForm
        form="resetPassword"
        submit={submit}
        successComponent={MockSuccessComponent}
        translate={msg => msg}
      />
    );

    comp.simulate('submit');
    expect(submit.calledOnce).toBeTruthy();
  });
});
