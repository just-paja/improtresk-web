import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { fetchResourceIfNeeded } from './common';
import { reverse } from '../routeTable';
import { shouldFetchParticipant } from '../selectors/participant';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchParticipantShowHome() {
  yield call(
    fetchResourceIfNeeded,
    api.fetchParticipant,
    shouldFetchParticipant,
    {
      onStart: constants.PARTICIPANT_FETCH_STARTED,
      onSuccess: constants.PARTICIPANT_FETCH_SUCCESS,
      onError: constants.PARTICIPANT_FETCH_ERROR,
    }
  );
  yield put(push(reverse('participant:home')));
}

export function* fetchParticipantOnLogin() {
  yield takeLatest(
    constants.PARTICIPANT_LOGIN,
    fetchParticipantShowHome
  );
}

export default [
  fetchParticipantOnLogin,
];
