import { expect } from 'chai';

import * as forms from '../../../src/web/forms';

describe('Form validators', () => {
  it('contains all required forms', () => {
    expect(Object.keys(forms)).to.eql([
      'changePassword',
      'changeWorkshop',
      'login',
      'newPassword',
      'order',
      'resetPassword',
      'signup',
    ]);
  });
});
