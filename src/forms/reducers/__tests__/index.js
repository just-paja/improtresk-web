import forms from '../index';

describe('Forms reducer', () => {
  it('returns default state', () => {
    expect(forms()).toEqual({});
  });

  it('updates form values', () => {
    expect(forms(
      {
        testForm: {
          values: {
            foo: 'bar',
          },
        },
      },
      {
        type: 'FORM_VALUES_SET',
        form: 'testForm',
        values: {
          foo: 'bax',
        },
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bax',
        },
      },
    });
  });

  it('updates form field value', () => {
    expect(forms(
      {
        testForm: {
          values: {
            foo: 'bar',
          },
        },
      },
      {
        type: 'FORM_FIELD_CHANGE',
        form: 'testForm',
        field: 'foo',
        value: 'baz',
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'baz',
        },
      },
    });
  });

  it('updates form field value and keeps other values in place', () => {
    expect(forms(
      {
        testForm: {
          values: {
            foo: 'extra',
            bar: 'gold',
          },
        },
      },
      {
        type: 'FORM_FIELD_CHANGE',
        form: 'testForm',
        field: 'bar',
        value: 'silver',
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'extra',
          bar: 'silver',
        },
      },
    });
  });

  it('updates form field value and creates form values state when not present', () => {
    expect(forms(
      { testForm: {} },
      {
        type: 'FORM_FIELD_CHANGE',
        form: 'testForm',
        field: 'foo',
        value: 'baz',
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'baz',
        },
      },
    });
  });

  it('updates form field value and creates form state when not present', () => {
    expect(forms(
      { },
      {
        type: 'FORM_FIELD_CHANGE',
        form: 'testForm',
        field: 'foo',
        value: 'baz',
      }
    )).toEqual({
      testForm: {
        errors: {},
        loading: false,
        saved: false,
        submitted: false,
        valid: true,
        values: {
          foo: 'baz',
        },
      },
    });
  });

  it('updates form validation status', () => {
    expect(forms(
      {
        testForm: {
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_VALUES_VALIDATE',
        form: 'testForm',
        valid: true,
        errors: {},
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bar',
        },
        valid: true,
        errors: {},
      },
    });
  });

  it('updates form submitted status', () => {
    expect(forms(
      {
        testForm: {
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_SUBMIT',
        form: 'testForm',
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bar',
        },
        submitted: true,
        submitErrors: [],
      },
    });
  });

  it('updates form loading status on submit prevention', () => {
    expect(forms(
      {
        testForm: {
          values: { foo: 'bar' },
          submitted: true,
        },
      },
      {
        type: 'FORM_SUBMIT_PREVENTED',
        form: 'testForm',
        valid: false,
        errors: {},
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bar',
        },
        submitted: true,
        loading: false,
        valid: false,
        errors: {},
      },
    });
  });

  it('updates form loading status on submit allowance', () => {
    expect(forms(
      {
        testForm: {
          values: { foo: 'bar' },
          submitted: true,
        },
      },
      {
        type: 'FORM_SUBMIT_ALLOWED',
        form: 'testForm',
        valid: true,
        errors: {},
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bar',
        },
        submitted: true,
        loading: true,
        valid: true,
        errors: {},
      },
    });
  });

  it('updates form loading status on submit start', () => {
    expect(forms(
      {
        testForm: {
          errors: {},
          saved: false,
          submitted: true,
          valid: true,
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_SUBMIT_STARTED',
        form: 'testForm',
      }
    )).toEqual({
      testForm: {
        values: { foo: 'bar' },
        submitted: true,
        saved: false,
        loading: true,
        valid: true,
        errors: {},
      },
    });
  });

  it('updates form loading status on submit success', () => {
    expect(forms(
      {
        testForm: {
          errors: {},
          saved: false,
          submitted: true,
          valid: true,
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_SUBMIT_SUCCESS',
        form: 'testForm',
      }
    )).toEqual({
      testForm: {
        values: { foo: 'bar' },
        submitted: true,
        saved: true,
        loading: false,
        valid: true,
        errors: {},
      },
    });
  });

  it('updates form loading status on submit error', () => {
    expect(forms(
      {
        testForm: {
          errors: {},
          submitted: true,
          valid: true,
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_SUBMIT_ERROR',
        form: 'testForm',
        data: {
          errors: ['foo'],
        },
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bar',
        },
        saved: false,
        submitted: true,
        loading: false,
        valid: true,
        errors: {
          errors: ['foo'],
        },
        submitErrors: ['foo'],
      },
    });
  });

  it('updates form loading status on submit error when data are missing', () => {
    expect(forms(
      {
        testForm: {
          errors: {},
          submitted: true,
          valid: true,
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_SUBMIT_ERROR',
        form: 'testForm',
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bar',
        },
        saved: false,
        submitted: true,
        loading: false,
        valid: true,
        errors: {},
        submitErrors: null,
      },
    });
  });

  it('updates form loading status on submit error from error message', () => {
    expect(forms(
      {
        testForm: {
          errors: {},
          submitted: true,
          valid: true,
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_SUBMIT_ERROR',
        form: 'testForm',
        error: new Error('foo'),
      }
    )).toEqual({
      testForm: {
        values: {
          foo: 'bar',
        },
        saved: false,
        submitted: true,
        loading: false,
        valid: true,
        errors: {},
        submitErrors: ['foo'],
      },
    });
  });

  it('clears form values on clear', () => {
    expect(forms(
      {
        testForm: {
          errors: {},
          submitted: true,
          valid: true,
          values: { foo: 'bar' },
        },
      },
      {
        type: 'FORM_VALUES_CLEAR',
        form: 'testForm',
        data: {
          errors: ['foo'],
        },
      }
    )).toEqual({
      testForm: {
        errors: {},
        submitted: false,
        saved: false,
        valid: true,
        values: {},
      },
    });
  });
});
