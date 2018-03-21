import sinon from 'sinon';

import { initialize } from 'redux-form';

import { changePassword, newPassword, resetPassword } from '../../actions';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

describe('Participant password saga', () => {
  beforeEach(() => {
    sinon.stub(changePassword, 'resource');
    sinon.stub(newPassword, 'resource');
    sinon.stub(resetPassword, 'resource');
  });

  afterEach(() => {
    changePassword.resource.restore();
    newPassword.resource.restore();
    resetPassword.resource.restore();
  });

  it('submits reset password form on submit', () => {
    const sagaTester = getSagaTester();
    resetPassword.resource.returns({
      ok: true,
      status: 204,
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(initialize('FORM_RESET_PASSWORD', {
      email: 'foo@bar.com',
    }));
    sagaTester.dispatch(resetPassword());
    expect(sagaTester.numCalled(resetPassword.REQUEST)).toBe(1);
    expect(resetPassword.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      formData: {
        email: 'foo@bar.com',
      },
    }));
  });

  it('submits change password form on submit', () => {
    const sagaTester = getSagaTester();
    changePassword.resource.returns({
      ok: true,
      status: 204,
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(initialize('FORM_CHANGE_PASSWORD', {
      email: 'foo@bar.com',
    }));
    sagaTester.dispatch(changePassword());
    expect(sagaTester.numCalled(changePassword.REQUEST)).toBe(1);
    expect(changePassword.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      formData: {
        email: 'foo@bar.com',
      },
    }));
  });

  it('submits new password form on submit', () => {
    const sagaTester = getSagaTester();
    newPassword.resource.returns({
      ok: true,
      status: 204,
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(initialize('FORM_NEW_PASSWORD', {
      email: 'foo@bar.com',
    }));
    sagaTester.dispatch(newPassword());
    expect(sagaTester.numCalled(newPassword.REQUEST)).toBe(1);
    expect(newPassword.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      formData: {
        email: 'foo@bar.com',
      },
    }));
  });
});
