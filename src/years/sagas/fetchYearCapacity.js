import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/lib';

import { fetchResource } from '../../sagas/api';
import { isPolling } from '../selectors/yearCapacity';
import { yearActiveNumber } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchCapacity() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(fetchResource, api.fetchCapacity, {
      actions: {
        start: constants.YEAR_CAPACITY_FETCH_STARTED,
        success: constants.YEAR_CAPACITY_FETCH_SUCCESS,
        fail: constants.YEAR_CAPACITY_FETCH_ERROR,
      },
      params: { year },
    });
  }
}

export function* pollCapacity() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(fetchResource, api.fetchCapacity, {
      actions: {
        start: constants.YEAR_CAPACITY_UPDATE_STARTED,
        success: constants.YEAR_CAPACITY_UPDATE_SUCCESS,
        fail: constants.YEAR_CAPACITY_UPDATE_ERROR,
      },
      params: { year },
    });
    yield call(delay, 8000);
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

export function* requireCapacity() {
  yield takeLatest(
    constants.YEAR_CAPACITY_REQUIRED,
    fetchCapacity
  );
}

export function* requirePollCapacity() {
  yield takeLatest(
    constants.YEAR_CAPACITY_POLL_CYCLE_FINISHED,
    pollCapacity
  );
}

export function* requirePollCapacityStart() {
  yield takeLatest(
    [
      constants.YEAR_CAPACITY_POLL_REQUIRED,
      constants.YEAR_CAPACITY_FETCH_SUCCESS,
    ],
    pollCapacityStart
  );
}

export function* requirePollCapacityStop() {
  yield takeLatest(
    constants.YEAR_CAPACITY_POLL_STOP_REQUIRED,
    pollCapacityStop
  );
}

export default [
  requireCapacity,
  requirePollCapacity,
  requirePollCapacityStop,
  requirePollCapacityStart,
];