import { expect } from 'chai';

import signup from '../../../src/web/forms/newPassword';

describe('New password validator', () => {
  it('requires passwords to be the same', () => {
    expect(signup({
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
