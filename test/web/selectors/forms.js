import { expect } from 'chai';

import { getForm } from '../../../src/web/selectors/forms';

describe('Formsselectors', () => {
  it('getForm returns form data', () => {
    expect(getForm({
      forms: {
        testForm: {
          values: { foo: 'bar' },
        },
      },
    }, 'testForm')).to.eql({
      values: { foo: 'bar' },
    });
  });
});
