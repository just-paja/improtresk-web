import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { getCurrent, isValid } from '../selectors/archive';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchArchivedYear() {
  const year = yield select(getCurrent);
  yield fork(
    fetchResourceIfNeeded,
    api.fetchArchivedYear,
    isValid,
    {
      onStart: constants.ARCHIVED_YEAR_FETCH_STARTED,
      onSuccess: constants.ARCHIVED_YEAR_FETCH_SUCCESS,
      onError: constants.ARCHIVED_YEAR_FETCH_ERROR,
      year,
    }
  );
}

export function* bindFetchArchivedYear() {
  yield takeLatest(
    constants.ARCHIVED_YEAR_MOUNTED,
    fetchArchivedYear
  );
}

export default [
  bindFetchArchivedYear,
];
