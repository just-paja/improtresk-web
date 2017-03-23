import { fork, put, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from './common';
import { getForm } from '../selectors/forms';

import * as constants from '../constants/actions';
import * as forms from '../forms';

const getFormValidator = form => forms[form];

const validateAction = (form, formValues, validator) => ({
  type: constants.FORM_VALUES_VALIDATE,
  form,
  ...validator(formValues),
});

export function* validateForm(action) {
  const validator = getFormValidator(action.form);

  if (validator) {
    const form = yield select(getForm, action.form);
    yield put(validateAction(action.form, form.values, validator));
  }
}

export function* validateAndSubmitForm(action) {
  const validator = getFormValidator(action.form);
  const form = yield select(getForm, action.form);
  const status = yield validator(form.values);

  const type = status.valid ?
    constants.FORM_SUBMIT_ALLOWED :
    constants.FORM_SUBMIT_PREVENTED;

  yield put({
    type,
    form: action.form,
    ...status,
  });
}

export function* validateFormOnValuesChange() {
  yield takeLatest(constants.FORM_FIELD_CHANGE, validateForm);
}

export function* validateFormOnSubmit() {
  yield takeLatest(constants.FORM_SUBMIT, validateAndSubmitForm);
}

export function* sendForm(apiResource, form, data, params = {}) {
  yield fork(fetchResource,
    apiResource,
    {
      onStart: constants.FORM_SUBMIT_STARTED,
      onSuccess: constants.FORM_SUBMIT_SUCCESS,
      onError: constants.FORM_SUBMIT_ERROR,
      form,
      data,
      ...params,
    }
  );
}

export default [
  validateFormOnValuesChange,
  validateFormOnSubmit,
];
