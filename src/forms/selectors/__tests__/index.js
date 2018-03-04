import { getForm, isFormValid } from '..';

describe('Formsselectors', () => {
  it('getForm returns form data', () => {
    expect(getForm('testForm')({
      forms: {
        testForm: {
          values: { foo: 'bar' },
        },
      },
    })).toEqual({
      formName: 'testForm',
      values: { foo: 'bar' },
    });
  });

  it('getForm returns default form state when data are not specified', () => {
    expect(getForm('testForm')({
      forms: {},
    })).toEqual({
      formName: 'testForm',
      fieldErrors: {},
      saved: false,
      submitted: false,
      loading: false,
      valid: true,
      values: {},
    });
  });

  it('isFormValid returns true when form is in valid state', () => {
    expect(isFormValid('testForm')({ forms: {} })).toBe(true);
    expect(isFormValid('testForm')({
      forms: {
        testForm: {
          valid: true,
        },
      },
    })).toBe(true);
  });

  it('isFormValid returns false when form is in invalid state', () => {
    expect(isFormValid('testForm')({
      forms: {
        testForm: {
          valid: false,
        },
      },
    })).toBe(false);
  });
});
