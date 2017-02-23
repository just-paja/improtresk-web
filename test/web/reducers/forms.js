import { expect } from 'chai';

import forms from '../../../src/web/reducers/forms';

describe('Forms reducer', () => {
  it('returns default state', () => {
    expect(forms()).to.eql({});
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
    )).to.eql({
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
    )).to.eql({
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
    )).to.eql({
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
    )).to.eql({
      testForm: {
        errors: {},
        loading: false,
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
    )).to.eql({
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
    )).to.eql({
      testForm: {
        values: {
          foo: 'bar',
        },
        submitted: true,
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
    )).to.eql({
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
    )).to.eql({
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
  it('updates form loading status on submit success', () => {
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
        type: 'FORM_SUBMIT_SUCCESS',
        form: 'testForm',
      }
    )).to.eql({
      testForm: {
        values: {
          foo: 'bar',
        },
        submitted: true,
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
        error: 'foo',
      }
    )).to.eql({
      testForm: {
        values: {
          foo: 'bar',
        },
        submitted: true,
        loading: false,
        valid: true,
        errors: {},
        error: 'foo',
      },
    });
  });
});
