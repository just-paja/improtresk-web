import { fork, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getForm } from '../selectors/forms';
import { reverse } from '../routeTable';
import { sendForm } from './forms';

import * as api from '../api';
import * as constants from '../constants/actions';

export const selectSignupSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'signup';

export const selectSignupSuccess = action =>
  action.type === constants.FORM_SUBMIT_SUCCESS && action.form === 'signup';

export const selectLoginSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'login';

export function* sendSignup(action) {
  const form = yield select(getForm, action.form);
  yield fork(sendForm, api.signup, action.form, form.values);
}

export function* sendLogin(action) {
  const form = yield select(getForm, action.form);
  yield fork(sendForm, api.login, action.form, form.values);
}

export function* loginSignup(action) {
  yield put({
    type: constants.SIGNUP_REGISTERED,
    data: action.data,
  });
  yield put(push(reverse('participant:home')));
}

export function* signupOnFormSubmit() {
  yield takeLatest(selectSignupSubmit, sendSignup);
}

export function* loginOnSignup() {
  yield takeLatest(selectSignupSuccess, loginSignup);
}

export function* loginOnFormSubmit() {
  yield takeLatest(selectLoginSubmit, sendLogin);
}

export default [
  loginOnFormSubmit,
  loginOnSignup,
  signupOnFormSubmit,
];
