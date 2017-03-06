import { put, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from './common';
import { getForm } from '../selectors/forms';

import * as api from '../api';
import * as constants from '../constants/actions';

const formSelector = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'signup';

const formSuccessSelector = action =>
  action.type === constants.FORM_SUBMIT_SUCCESS && action.form === 'signup';

export function* sendSignup(action) {
  const form = yield select(getForm, action.form);
  yield fetchResource(
    api.signup,
    {
      onStart: constants.FORM_SUBMIT_STARTED,
      onSuccess: constants.FORM_SUBMIT_SUCCESS,
      onError: constants.FORM_SUBMIT_ERROR,
      form: action.form,
      data: form.values,
    }
  );
}

export function* loginSignup(action) {
  yield put({
    type: constants.SIGNUP_REGISTERED,
    data: action.data,
  });
}

export function* signupOnFormSubmit() {
  yield takeLatest(formSelector, sendSignup);
}

export function* loginOnSignup() {
  yield takeLatest(formSuccessSelector, loginSignup);
}

export default [
  loginOnSignup,
  signupOnFormSubmit,
];
