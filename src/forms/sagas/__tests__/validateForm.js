import sinon from 'sinon';

import { put, takeLatest } from 'redux-saga/effects';

import * as validators from '../../validators';
import * as sagas from '..';

describe('Form saga helpers', () => {
  let getValidatorStub;

  beforeEach(() => {
    getValidatorStub = sinon.stub(validators, 'default');
  });

  afterEach(() => {
    getValidatorStub.restore();
  });

  it('onFormChange triggers form validation saga', () => {
    const gen = sagas.onFormChange();
    expect(gen.next().value).toEqual(takeLatest('FORM_FIELD_CHANGE', sagas.validateForm));
    expect(gen.next().done).toBe(true);
  });

  it('onFormSubmit triggers form submit and validation saga', () => {
    const gen = sagas.onFormSubmit();
    expect(gen.next().value).toEqual(takeLatest('FORM_SUBMIT', sagas.validateAndAllowFormSubmit));
    expect(gen.next().done).toBe(true);
  });

  it('validateForm validates form when given validator', () => {
    const fakeValidator = () => ({
      errors: [],
    });
    getValidatorStub.returns(fakeValidator);
    const gen = sagas.validateForm({
      form: 'testForm',
    });
    gen.next();
    expect(gen.next({
      values: {},
    }).value).toEqual(put({
      type: 'FORM_VALUES_VALIDATE',
      errors: [],
      form: 'testForm',
    }));
    expect(gen.next().done).toEqual(true);
  });

  it('validateForm skips validation if validator is missing', () => {
    const gen = sagas.validateForm({
      form: 'xkcd',
    });
    expect(gen.next().done).toBe(true);
  });

  it('validateAndAllowFormSubmit validates and blocks invalid form submit', () => {
    const gen = sagas.validateAndAllowFormSubmit({
      form: 'signup',
    });
    getValidatorStub.returns(() => ({
      valid: false,
    }));

    gen.next();
    expect(gen.next({ values: {} }).value).toEqual(put({
      type: 'FORM_SUBMIT_PREVENTED',
      form: 'signup',
      valid: false,
    }));
    expect(gen.next().done).toBe(true);
  });

  it('validateAndAllowFormSubmit validates and allows valid form submit', () => {
    const gen = sagas.validateAndAllowFormSubmit({
      form: 'xxx',
    });

    gen.next();
    expect(gen.next({ valid: true }).value).toEqual(put({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'xxx',
      valid: true,
    }));
    expect(gen.next().done).toBe(true);
  });
});
