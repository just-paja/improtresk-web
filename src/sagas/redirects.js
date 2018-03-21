import { call, put, select, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as constants from '../constants';

import { reverse } from '../routeTable';
import { getLang } from '../selectors';

export function* redirect(dest) {
  const lang = yield select(getLang);
  yield put(push(reverse(lang, dest)));
}

export function* redirectSignup() {
  yield redirect('signup');
}

export function* redirectHome() {
  yield redirect('participantHome');
}

function* handleActionRedirect(action) {
  yield call(redirect, action.path);
}

function* onRedirect() {
  yield takeEvery(constants.REDIRECT, handleActionRedirect);
}

export default [onRedirect];
