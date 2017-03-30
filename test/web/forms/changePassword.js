import { expect } from 'chai';

import signup from '../../../src/web/forms/changePassword';

describe('Change password validator', () => {
  it('returns flag invalid when passwords do not match', () => {
    expect(signup({
      oldPassword: 'testX12',
      newPassword: 'testX12',
      newPasswordConfirm: 'foo',
    })).to.eql({
      errors: {
        newPasswordConfirm: 'Hesla nesouhlasí',
      },
      valid: false,
    });
  });
  it('returns flag valid when passwords match', () => {
    expect(signup({
      oldPassword: 'testX13',
      newPassword: 'testX12',
      newPasswordConfirm: 'testX12',
    })).to.eql({
      errors: {},
      valid: true,
    });
  });
});
