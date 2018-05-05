import { put, takeLatest } from 'redux-saga/effects';

import * as constants from '../constants';

import { teamsRequired } from '../../participants/actions';
import { orderListFetch } from '../../orders/actions';

function* requireSignupPageResources() {
  yield put(teamsRequired());
}

function* requireParticipantPageResources() {
  yield put(teamsRequired());
  yield put(orderListFetch());
}

function* onSignupEnter() {
  yield takeLatest(
    constants.PAGE_SIGNUP_ENTERED,
    requireSignupPageResources
  );
}

function* onParticipantPageEnter() {
  yield takeLatest(
    constants.PAGE_PARTICIPANT_HOME_ENTERED,
    requireParticipantPageResources
  );
}

export default [
  onParticipantPageEnter,
  onSignupEnter,
];
