import cookie from 'js-cookie';

import { put, select, takeLatest } from 'redux-saga/effects';
import { destroy } from 'redux-form';

import { redirectHome } from '../../sagas/redirects';
import { getApiAuth } from '../../selectors/session';
import { login, setAuthKey } from '../actions';
import { APP_MOUNTED } from '../../constants';
import { createFormSubmitSaga } from '../../forms/sagas';

import * as constants from '../constants';

function* loginWithAuthKey(action) {
  yield put(destroy(constants.FORM_LOGIN));
  cookie.set('auth', action.payload, { expires: 30 });
  yield put(setAuthKey(action.payload));
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

function* onLoginFormSuccess() {
  yield takeLatest(login.SUCCESS, loginWithAuthKey);
}

function* onLoginSuccess() {
  yield takeLatest([
    login.SUCCESS,
  ], redirectHome);
}

function* onMount() {
  yield takeLatest(APP_MOUNTED, loginWithCookie);
}

export default [
  ...createFormSubmitSaga(login),
  onLoginFormSuccess,
  onLoginSuccess,
  onMount,
];
