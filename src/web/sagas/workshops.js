import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import {
  getWorkshopDetailId,
  shouldFetchList,
  shouldFetchDetail,
  shouldFetchDifficulties,
  shouldFetchLocations,
} from '../selectors/workshops';
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

export function* requireWorkshopDifficulties() {
  yield takeLatest(
    constants.APP_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchWorkshopDifficulties,
    shouldFetchDifficulties,
    {
      onStart: constants.WORKSHOP_DIFFICULTIES_FETCH_STARTED,
      onSuccess: constants.WORKSHOP_DIFFICULTIES_FETCH_SUCCESS,
      onError: constants.WORKSHOP_DIFFICULTIES_FETCH_ERROR,
    }
  );
}

function* requireYearsWorkshopLocations() {
  const year = yield select(yearActiveNumber);
  yield fork(
    fetchResourceIfNeeded,
    api.fetchWorkshopLocations,
    shouldFetchLocations,
    {
      onStart: constants.WORKSHOP_LOCATIONS_FETCH_STARTED,
      onSuccess: constants.WORKSHOP_LOCATIONS_FETCH_SUCCESS,
      onError: constants.WORKSHOP_LOCATIONS_FETCH_ERROR,
      year,
    }
  );
}

export function* requireWorkshopLocations() {
  yield takeLatest(
    constants.REQUEST_WORKSHOP_LOCATIONS,
    requireYearsWorkshopLocations
  );
}

export function* requireWorkshops() {
  yield takeLatest(
    constants.WORKSHOPS_MOUNTED,
    requireYearsWorkshops
  );
}

export function* requireYearsWorkshopDetail() {
  const year = yield select(yearActiveNumber);
  const workshop = yield select(getWorkshopDetailId);
  yield fork(
    fetchResourceIfNeeded,
    api.fetchWorkshopDetail,
    shouldFetchDetail,
    {
      onStart: constants.WORKSHOP_DETAIL_FETCH_STARTED,
      onSuccess: constants.WORKSHOP_DETAIL_FETCH_SUCCESS,
      onError: constants.WORKSHOP_DETAIL_FETCH_ERROR,
      year,
      workshop,
    }
  );
}

export function* requireWorkshopDetail() {
  yield takeLatest(
    constants.WORKSHOP_DETAIL_MOUNTED,
    requireYearsWorkshopDetail
  );
}

export default [
  requireWorkshops,
  requireWorkshopDetail,
  requireWorkshopDifficulties,
  requireWorkshopLocations,
];
