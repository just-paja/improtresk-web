import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import {
  getWorkshopDetailId,
  isWorkshopListRequired,
  isWorkshopDetailRequired,
  isDifficultyListRequired,
  isLocationListRequired,
} from '../selectors';
import { yearActiveNumber } from '../../years/selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* requireYearsWorkshops() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(
      fetchResourceIfRequired,
      api.fetchWorkshops,
      {
        isRequired: isWorkshopListRequired,
        actions: {
          start: constants.WORKSHOPS_FETCH_STARTED,
          success: constants.WORKSHOPS_FETCH_SUCCESS,
          fail: constants.WORKSHOPS_FETCH_ERROR,
        },
        params: { year },
      }
    );
  }
}

export function* requireWorkshopDifficulties() {
  yield takeEvery(
    constants.WORKSHOP_DIFFICULTIES_REQUIRED,
    fetchResourceIfRequired,
    api.fetchWorkshopDifficulties,
    {
      isRequired: isDifficultyListRequired,
      actions: {
        start: constants.WORKSHOP_DIFFICULTIES_FETCH_STARTED,
        success: constants.WORKSHOP_DIFFICULTIES_FETCH_SUCCESS,
        fail: constants.WORKSHOP_DIFFICULTIES_FETCH_ERROR,
      },
    }
  );
}

export function* requireYearsWorkshopLocations() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(
      fetchResourceIfRequired,
      api.fetchWorkshopLocations,
      {
        isRequired: isLocationListRequired,
        actions: {
          start: constants.WORKSHOP_LOCATIONS_FETCH_STARTED,
          success: constants.WORKSHOP_LOCATIONS_FETCH_SUCCESS,
          fail: constants.WORKSHOP_LOCATIONS_FETCH_ERROR,
        },
        params: { year },
      }
    );
  }
}

export function* requireWorkshopLocations() {
  yield takeEvery(
    constants.WORKSHOP_LOCATIONS_REQUIRED,
    requireYearsWorkshopLocations
  );
}

export function* requireWorkshops() {
  yield takeEvery(constants.WORKSHOPS_REQUIRED, requireYearsWorkshops);
}

export function* fetchWorkshopDetail() {
  const year = yield select(yearActiveNumber);
  const workshop = yield select(getWorkshopDetailId);
  if (year && workshop) {
    yield call(
      fetchResourceIfRequired,
      api.fetchWorkshopDetail,
      {
        isRequired: isWorkshopDetailRequired,
        actions: {
          start: constants.WORKSHOP_DETAIL_FETCH_STARTED,
          success: constants.WORKSHOP_DETAIL_FETCH_SUCCESS,
          fail: constants.WORKSHOP_DETAIL_FETCH_ERROR,
        },
        params: {
          year,
          workshop,
        },
      }
    );
  }
}

export function* requireWorkshopDetail() {
  yield takeEvery(
    constants.WORKSHOP_DETAIL_REQUIRED,
    fetchWorkshopDetail
  );
}

export default [
  requireWorkshops,
  requireWorkshopDetail,
  requireWorkshopDifficulties,
  requireWorkshopLocations,
];
