import { expect } from 'chai';

import { getForm, isFormValid } from '../../../src/web/selectors/forms';

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

  it('getForm returns default form state when data are not specified', () => {
    expect(getForm({
      forms: {},
    }, 'testForm')).to.eql({
      errors: {},
      saved: false,
      submitted: false,
      loading: false,
      valid: true,
      values: {},
    });
  });

  it('isFormValid returns true when form is in valid state', () => {
    expect(isFormValid({ forms: {} }, 'testForm')).to.equal(true);
    expect(isFormValid({
      forms: {
        testForm: {
          valid: true,
        },
      },
    }, 'testForm')).to.equal(true);
  });

  it('isFormValid returns false when form is in invalid state', () => {
    expect(isFormValid({
      forms: {
        testForm: {
          valid: false,
        },
      },
    }, 'testForm')).to.equal(false);
  });
});
