import getValidator, * as forms from '../';

describe('Form validators', () => {
  it('contains all required forms', () => {
    expect(Object.keys(forms)).toEqual([
      'changeFood',
      'changePassword',
      'changeWorkshop',
      'login',
      'newPassword',
      'order',
      'resetPassword',
      'signup',
      'default',
    ]);
  });

  it('getValidator returns existing validator', () => {
    expect(getValidator('login')).toBeInstanceOf(Function);
  });
});
