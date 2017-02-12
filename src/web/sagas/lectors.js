import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { shouldFetchList, shouldFetchRoles } from '../selectors/lectors';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* requireLectorRoles() {
  yield takeLatest(
    constants.APP_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchLectorRoles,
    shouldFetchRoles,
    {
      onStart: constants.LECTOR_ROLES_FETCH_STARTED,
      onSuccess: constants.LECTOR_ROLES_FETCH_SUCCESS,
      onError: constants.LECTOR_ROLES_FETCH_ERROR,
    }
  );
}

export function* requireLectors() {
  yield takeLatest(
    constants.APP_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchLectors,
    shouldFetchList,
    {
      onStart: constants.LECTORS_FETCH_STARTED,
      onSuccess: constants.LECTORS_FETCH_SUCCESS,
      onError: constants.LECTORS_FETCH_ERROR,
    }
  );
}

export default [
  requireLectorRoles,
  requireLectors,
];
