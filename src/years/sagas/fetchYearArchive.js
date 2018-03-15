import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { getCurrent, isArchiveRequired } from '../selectors/yearArchive';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchArchivedYear() {
  const year = yield select(getCurrent);
  yield call(
    fetchResourceIfRequired,
    api.fetchArchivedYear,
    {
      isRequired: isArchiveRequired,
      actions: {
        start: constants.YEAR_DETAIL_FETCH_STARTED,
        success: constants.YEAR_DETAIL_FETCH_SUCCESS,
        fail: constants.YEAR_DETAIL_FETCH_ERROR,
      },
      params: { year },
    }
  );
}

export function* requireArchivedYear() {
  yield takeLatest(
    constants.YEAR_DETAIL_REQUIRED,
    fetchArchivedYear
  );
}

export default [
  requireArchivedYear,
];
