import { put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import { getForm } from '../selectors/forms';

import * as constants from '../constants/actions';
import * as forms from '../forms';

export function* validateForm(action) {
  const validator = forms[action.form];

  if (validator) {
    const form = yield select(getForm, action.form);
    yield put({
      type: constants.FORM_VALUES_VALIDATE,
      form: action.form,
      ...validator(form.values),
    });
  }
}

export function* validateFormOnValuesChange() {
  yield* takeLatest(constants.FORM_FIELD_CHANGE, validateForm);
}

export default [
  validateFormOnValuesChange,
];
