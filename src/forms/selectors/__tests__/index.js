import { getForm, isFormValid } from '..';

describe('Formsselectors', () => {
  it('getForm returns form data', () => {
    expect(getForm({
      forms: {
        testForm: {
          values: { foo: 'bar' },
        },
      },
    }, 'testForm')).toEqual({
      values: { foo: 'bar' },
    });
  });

  it('getForm returns default form state when data are not specified', () => {
    expect(getForm({
      forms: {},
    }, 'testForm')).toEqual({
      errors: {},
      saved: false,
      submitted: false,
      loading: false,
      valid: true,
      values: {},
    });
  });

  it('isFormValid returns true when form is in valid state', () => {
    expect(isFormValid({ forms: {} }, 'testForm')).toBe(true);
    expect(isFormValid({
      forms: {
        testForm: {
          valid: true,
        },
      },
    }, 'testForm')).toBe(true);
  });

  it('isFormValid returns false when form is in invalid state', () => {
    expect(isFormValid({
      forms: {
        testForm: {
          valid: false,
        },
      },
    }, 'testForm')).toBe(false);
  });
});
