import { put, takeLatest } from 'redux-saga/effects';

import * as constants from '../constants';
import { TEAMS_REQUIRED } from '../../participants/constants';

function* requireSignupPageResources() {
  yield put({ type: TEAMS_REQUIRED });
}

function* onSignupEnter() {
  yield takeLatest(
    constants.PAGE_SIGNUP_ENTERED,
    requireSignupPageResources
  );
}

export default [
  onSignupEnter,
];
