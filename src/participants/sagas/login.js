import cookie from 'js-cookie';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../forms/sagas/sendForm';
import { redirectHome } from '../../sagas/redirects';
import { getApiAuth } from '../../selectors/session';
import { getLoginForm } from '../selectors';

import {
  FORM_SUBMIT_ALLOWED,
  FORM_SUBMIT_SUCCESS,
} from '../../forms/constants';
import { APP_MOUNTED } from '../../constants';

import * as formActions from '../../forms/actions';
import * as actions from '../actions';
import * as api from '../../api';
import * as constants from '../constants';

export const selectLoginSubmit = action =>
  action.type === FORM_SUBMIT_ALLOWED && action.form === 'login';

export const selectLoginSuccess = action =>
  action.type === FORM_SUBMIT_SUCCESS && action.form === 'login';

function* submitLoginForm(action) {
  const form = yield select(getLoginForm);
  yield call(sendForm, api.login, action.form, form.values);
}

function* loginWithAuthKey(action) {
  cookie.set('auth', action.data, { expires: 30 });
  yield put(actions.setAuthKey(action.data));
  yield put(formActions.formClear('login'));
}

function* loginWithCookie() {
  let auth = yield select(getApiAuth);

  if (!auth || !auth.access_token) {
    auth = cookie.getJSON('auth');
  }

  yield put({ type: constants.PARTICIPANT_LOGIN_AUTO });

  if (auth && auth.access_token) {
    yield put({
      type: constants.PARTICIPANT_LOGIN_AUTO_SUCCESS,
      data: auth,
    });
  } else {
    yield put({ type: constants.PARTICIPANT_LOGOUT });
  }
}

function* onLoginFormSubmit() {
  yield takeLatest(selectLoginSubmit, submitLoginForm);
}

function* onLoginFormSuccess() {
  yield takeLatest(selectLoginSuccess, loginWithAuthKey);
}

function* onLoginSuccess() {
  yield takeLatest(constants.PARTICIPANT_LOGIN, redirectHome);
}

function* onMount() {
  yield takeLatest(APP_MOUNTED, loginWithCookie);
}

export default [
  onLoginFormSubmit,
  onLoginFormSuccess,
  onLoginSuccess,
  onMount,
];
