import cookie from 'js-cookie';

import { fork, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getForm } from '../selectors/forms';
import { getApiAuth, getAutoLoginStatus } from '../selectors/session';
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

export const selectLoginSuccess = action =>
  action.type === constants.FORM_SUBMIT_SUCCESS && action.form === 'login';

const purifySignupValues = values => ({
  ...values,
  team_name: values.team_name ? values.team_name.value : null,
});

export function* sendSignup(action) {
  const form = yield select(getForm, action.form);
  yield fork(sendForm, api.signup, action.form, purifySignupValues(form.values));
}

export function* sendLogin(action) {
  const form = yield select(getForm, action.form);
  yield fork(sendForm, api.login, action.form, form.values);
}

export function* loginSignup(action) {
  const form = yield select(getForm, 'signup');
  yield fork(sendForm, api.login, 'login', {
    email: form.values.email,
    password: form.values.password,
  });
  yield put({
    type: constants.PARTICIPANT_REGISTERED,
    data: action.data,
  });
}

export function* login(action) {
  yield put({
    type: constants.PARTICIPANT_LOGIN,
    data: action.data,
  });
  cookie.set('auth', action.data, { expires: 30 });
  yield put(push(reverse('participant:home')));
}

export function* loginWithCookie() {
  const autoLoginAttempted = yield select(getAutoLoginStatus);

  if (!autoLoginAttempted) {
    let auth = yield select(getApiAuth);
    if (!auth.access_token) {
      auth = cookie.getJSON('auth');
    }

    if (auth) {
      yield put({
        type: constants.PARTICIPANT_LOGIN,
        data: auth,
      });
    }
    yield put({ type: constants.PARTICIPANT_LOGIN_AUTO });
  }
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

export function* loginOnAction() {
  yield takeLatest(selectLoginSuccess, login);
}

export function* loginOnMount() {
  yield takeLatest(constants.APP_MOUNTED, loginWithCookie);
}

export default [
  loginOnAction,
  loginOnFormSubmit,
  loginOnSignup,
  loginOnMount,
  signupOnFormSubmit,
];
