import { expect } from 'chai';

import signup from '../../../src/web/forms/newPassword';

describe('New password validator', () => {
  it('returns flag invalid when passwords do not match', () => {
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
  it('returns flag valid when passwords match', () => {
    expect(signup({
      newPassword: 'test156',
      newPasswordConfirm: 'test156',
    })).to.eql({
      errors: {},
      valid: true,
    });
  });
});
