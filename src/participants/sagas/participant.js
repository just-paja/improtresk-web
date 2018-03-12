import cookie from 'js-cookie';

import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResource, fetchResourceIfRequired } from '../../sagas/api';
import { getApiAuth } from '../../selectors/session';
import { isParticipantRequired } from '../selectors';
import { redirectSignup } from '../../sagas/redirects';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchParticipantShowHome() {
  const auth = yield select(getApiAuth);

  if (auth && auth.access_token) {
    yield call(fetchResourceIfRequired, api.fetchParticipant, {
      isRequired: isParticipantRequired,
      actions: {
        start: constants.PARTICIPANT_FETCH_STARTED,
        success: constants.PARTICIPANT_FETCH_SUCCESS,
        fail: constants.PARTICIPANT_FETCH_ERROR,
      },
    });
  }
}

export function* requireParticipant() {
  yield takeEvery(
    [
      constants.PARTICIPANT_LOGIN,
      constants.PARTICIPANT_LOGIN_AUTO,
      constants.PARTICIPANT_LOGIN_AUTO_SUCCESS,
    ],
    fetchParticipantShowHome
  );
}

export function* logout() {
  const auth = yield select(getApiAuth);
  if (auth.access_token) {
    yield call(fetchResource, api.logout, {
      actions: {
        start: constants.PARTICIPANT_TOKEN_REVOKE_START,
        success: constants.PARTICIPANT_TOKEN_REVOKE_SUCCESS,
        fail: constants.PARTICIPANT_TOKEN_REVOKE_ERROR,
      },
    });
  }
  cookie.set('auth', null);
}

function* afterLogout() {
  yield takeEvery(
    constants.PARTICIPANT_TOKEN_REVOKE_SUCCESS,
    redirectSignup
  );
}

export function* logoutOnAction() {
  yield takeEvery(
    constants.PARTICIPANT_LOGOUT,
    logout
  );
}

export default [
  afterLogout,
  requireParticipant,
  logoutOnAction,
];
