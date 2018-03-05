import cookie from 'js-cookie';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { getApiAuth, getAutoLoginStatus } from '../../selectors/session';
import { sendForm } from '../../forms/sagas/sendForm';
import { redirectHome } from '../../sagas/redirects';
import { getLoginForm, getSignupForm } from '../selectors';

import {
  FORM_SUBMIT_ALLOWED,
  FORM_SUBMIT_SUCCESS,
  FORM_VALUES_CLEAR,
} from '../../forms/constants';
import { APP_MOUNTED } from '../../constants';

import * as api from '../../api';
import * as constants from '../constants';

export const selectSignupSubmit = action =>
  action.type === FORM_SUBMIT_ALLOWED && action.form === 'signup';

export const selectSignupSuccess = action =>
  action.type === FORM_SUBMIT_SUCCESS && action.form === 'signup';

export const selectLoginSubmit = action =>
  action.type === FORM_SUBMIT_ALLOWED && action.form === 'login';

export const selectLoginSuccess = action =>
  action.type === FORM_SUBMIT_SUCCESS && action.form === 'login';

const purifySignupValues = values => ({
  ...values,
  team_name: values.team_name ? values.team_name.value : undefined,
});

export function* sendSignup(action) {
  const form = yield select(getSignupForm);
  yield call(sendForm, api.signup, action.form, purifySignupValues(form.values));
}

export function* sendLogin(action) {
  const form = yield select(getLoginForm);
  yield call(sendForm, api.login, action.form, form.values);
}

export function* loginSignup(action) {
  const form = yield select(getSignupForm);
  yield call(sendForm, api.login, 'login', {
    email: form.values.email,
    password: form.values.password,
  });
  yield put({
    type: constants.PARTICIPANT_REGISTERED,
    data: action.data,
  });
  yield put({
    type: FORM_VALUES_CLEAR,
    form: 'signup',
  });
}

export function* login(action) {
  yield put({
    type: constants.PARTICIPANT_LOGIN,
    data: action.data,
  });
  cookie.set('auth', action.data, { expires: 30 });
  yield put({
    type: FORM_VALUES_CLEAR,
    form: 'login',
  });
}

export function* loginWithCookie() {
  const autoLoginAttempted = yield select(getAutoLoginStatus);

  if (!autoLoginAttempted) {
    let auth = yield select(getApiAuth);
    if (!auth || !auth.access_token) {
      auth = cookie.getJSON('auth');
    }

    yield put({ type: constants.PARTICIPANT_LOGIN_AUTO });
    if (auth) {
      yield put({
        type: constants.PARTICIPANT_LOGIN_AUTO_SUCCESS,
        data: auth,
      });
    } else {
      yield put({
        type: constants.PARTICIPANT_LOGOUT,
        data: auth,
      });
    }
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

export function* afterLogin() {
  yield takeLatest(constants.PARTICIPANT_LOGIN, redirectHome);
}

export function* loginOnMount() {
  yield takeLatest(APP_MOUNTED, loginWithCookie);
}

export default [
  loginOnAction,
  loginOnFormSubmit,
  loginOnSignup,
  loginOnMount,
  signupOnFormSubmit,
];
