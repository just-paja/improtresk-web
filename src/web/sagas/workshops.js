import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { shouldFetchList, shouldFetchDetail } from '../selectors/workshops';
import { yearActiveNumber } from '../selectors/years';

import * as api from '../api';
import * as constants from '../constants/actions';

function* requireYearsWorkshops() {
  const year = yield select(yearActiveNumber);
  yield fork(
    fetchResourceIfNeeded,
    api.fetchWorkshops,
    shouldFetchList,
    {
      onStart: constants.WORKSHOPS_FETCH_STARTED,
      onSuccess: constants.WORKSHOPS_FETCH_SUCCESS,
      onError: constants.WORKSHOPS_FETCH_ERROR,
      year,
    }
  );
}

export function* requireWorkshops() {
  yield takeLatest(
    constants.WORKSHOPS_MOUNTED,
    requireYearsWorkshops
  );
}

export function* requireWorkshopDetail() {
  yield takeLatest(
    constants.WORKSHOP_DETAIL_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchWorkshopDetail,
    shouldFetchDetail,
    {
      onStart: constants.WORKSHOP_DETAIL_FETCH_STARTED,
      onSuccess: constants.WORKSHOP_DETAIL_FETCH_SUCCESS,
      onError: constants.WORKSHOP_DETAIL_FETCH_ERROR,
    }
  );
}

export default [
  requireWorkshops,
  requireWorkshopDetail,
];
