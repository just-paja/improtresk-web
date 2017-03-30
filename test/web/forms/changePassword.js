import { expect } from 'chai';

import signup from '../../../src/web/forms/changePassword';

describe('Change password validator', () => {
  it('requires passwords to be the same', () => {
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
});
