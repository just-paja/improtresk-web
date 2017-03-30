import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/lib';

import { fetchResource } from './common';
import { isPolling } from '../selectors/capacity';
import { yearActiveNumber } from '../selectors/years';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* pollCapacity() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(
      fetchResource,
      api.fetchCapacity,
      {
        onStart: constants.YEAR_CAPACITY_FETCH_STARTED,
        onSuccess: constants.YEAR_CAPACITY_FETCH_SUCCESS,
        onError: constants.YEAR_CAPACITY_FETCH_ERROR,
        year,
      }
    );
    yield call(delay, 10000);
    const polling = yield select(isPolling);
    if (polling) {
      yield put({ type: constants.YEAR_CAPACITY_POLL_CYCLE_FINISHED });
    }
  }
}

export function* pollCapacityStart() {
  const polling = yield select(isPolling);
  if (!polling) {
    yield put({ type: constants.YEAR_CAPACITY_POLL_START });
    yield fork(pollCapacity);
  }
}

export function* pollCapacityStop() {
  yield put({ type: constants.YEAR_CAPACITY_POLL_STOP });
}

export function* bindPollCapacity() {
  yield takeLatest(
    constants.YEAR_CAPACITY_POLL_CYCLE_FINISHED,
    pollCapacity
  );
}

export function* bindPollCapacityStart() {
  yield takeLatest(
    [
      constants.ACCOMODATION_MOUNTED,
      constants.ORDER_FORM_MOUNTED,
      constants.WORKSHOPS_MOUNTED,
    ],
    pollCapacityStart
  );
}

export function* bindPollCapacityStop() {
  yield takeLatest(
    [
      constants.ACCOMODATION_UNMOUNTED,
      constants.ORDER_FORM_UNMOUNTED,
      constants.WORKSHOPS_UNMOUNTED,
    ],
    pollCapacityStop
  );
}

export default [
  bindPollCapacity,
  bindPollCapacityStart,
  bindPollCapacityStop,
];
