import signup from '../signup';

describe('Signup form validator', () => {
  it('requires passwords to be the same', () => {
    expect(signup({
      birthday: '1990-01-01',
      email: 'foo@bar.com',
      name: 'Albert Dominator',
      phone: '123456789',
      rules_accepted: true,
      password: 'testX12',
      passwordCheck: 'foo',
    })).toEqual({
      errors: {
        passwordCheck: 'Hesla nesouhlasí',
      },
      valid: false,
    });
  });
});
