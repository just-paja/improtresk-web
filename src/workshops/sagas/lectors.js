import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isLectorListRequired, isLectorRolesListRequired } from '../selectors/lectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* requireLectorRoles() {
  yield takeLatest(
    constants.LECTOR_ROLES_REQUIRED,
    fetchResourceIfRequired,
    api.fetchLectorRoles,
    {
      isRequired: isLectorRolesListRequired,
      actions: {
        start: constants.LECTOR_ROLES_FETCH_STARTED,
        success: constants.LECTOR_ROLES_FETCH_SUCCESS,
        fail: constants.LECTOR_ROLES_FETCH_ERROR,
      },
    }
  );
}

export function* requireLectors() {
  yield takeLatest(
    constants.LECTORS_REQUIRED,
    fetchResourceIfRequired,
    api.fetchLectors,
    {
      isRequired: isLectorListRequired,
      actions: {
        start: constants.LECTORS_FETCH_STARTED,
        success: constants.LECTORS_FETCH_SUCCESS,
        fail: constants.LECTORS_FETCH_ERROR,
      },
    }
  );
}

export default [
  requireLectorRoles,
  requireLectors,
];
