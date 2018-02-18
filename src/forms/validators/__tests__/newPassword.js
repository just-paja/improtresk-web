import signup from '../newPassword';

describe('New password validator', () => {
  it('returns flag invalid when passwords do not match', () => {
    expect(signup({
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
      newPassword: 'test156',
      newPasswordConfirm: 'test156',
    })).toEqual({
      errors: {},
      valid: true,
    });
  });
});
