import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { isValid } from '../selectors/accomodation';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchArchivedYearOnMount() {
  yield takeLatest(
    constants.ARCHIVED_YEAR_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchArchivedYear,
    isValid,
    {
      onStart: constants.ARCHIVED_YEAR_FETCH_STARTED,
      onSuccess: constants.ARCHIVED_YEAR_FETCH_SUCCESS,
      onError: constants.ARCHIVED_YEAR_FETCH_ERROR,
    }
  );
}

export default [
  fetchArchivedYearOnMount,
];
