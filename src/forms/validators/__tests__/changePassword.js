import signup from '../changePassword';

describe('Change password validator', () => {
  it('returns flag invalid when passwords do not match', () => {
    expect(signup({
      oldPassword: 'testX12',
      newPassword: 'testX12',
      newPasswordConfirm: 'foo',
    })).toEqual({
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
    })).toEqual({
      errors: {},
      valid: true,
    });
  });
});
