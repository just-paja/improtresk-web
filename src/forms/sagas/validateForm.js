import { put, select, takeLatest } from 'redux-saga/effects';

import getFormValidator from '../validators';

import { getForm } from '../selectors';

import * as constants from '../constants';

const validateAction = (form, formValues, validator) => ({
  type: constants.FORM_VALUES_VALIDATE,
  form,
  ...validator(formValues),
});

export function* validateForm(action) {
  const validator = getFormValidator(action.form);

  if (validator) {
    const form = yield select(getForm(action.form));
    yield put(validateAction(action.form, form.values, validator));
  }
}

export function* validateAndAllowFormSubmit(action) {
  const validator = getFormValidator(action.form);
  const form = yield select(getForm(action.form));
  let status = { valid: true };

  if (validator) {
    status = validator(form.values);
  }

  const type = status.valid ?
    constants.FORM_SUBMIT_ALLOWED :
    constants.FORM_SUBMIT_PREVENTED;

  yield put({
    type,
    form: action.form,
    ...status,
  });
}

export function* onFormChange() {
  yield takeLatest(constants.FORM_FIELD_CHANGE, validateForm);
}

export function* onFormSubmit() {
  yield takeLatest(constants.FORM_SUBMIT, validateAndAllowFormSubmit);
}

export default [
  onFormChange,
  onFormSubmit,
];
