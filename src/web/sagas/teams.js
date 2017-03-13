import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';

import { shouldFetchTeams } from '../selectors/teams';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchTeamsOnMount() {
  yield takeLatest(
    constants.APP_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchTeams,
    shouldFetchTeams,
    {
      onStart: constants.TEAMS_FETCH_STARTED,
      onSuccess: constants.TEAMS_FETCH_SUCCESS,
      onError: constants.TEAMS_FETCH_ERROR,
    }
  );
}

export default [
  fetchTeamsOnMount,
];
