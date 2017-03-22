import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { isValid } from '../selectors/schedule';
import { yearActiveNumber } from '../selectors/years';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchYearsSchedule() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield fork(
      fetchResourceIfNeeded,
      api.fetchScheduleEvents,
      isValid,
      {
        onStart: constants.SCHEDULE_EVENTS_FETCH_STARTED,
        onSuccess: constants.SCHEDULE_EVENTS_FETCH_SUCCESS,
        onError: constants.SCHEDULE_EVENTS_FETCH_ERROR,
        year,
      }
    );
  }
}

export function* bindFetchYearsSchedule() {
  yield takeLatest(
    constants.SCHEDULE_MOUNTED,
    fetchYearsSchedule
  );
}

export default [
  bindFetchYearsSchedule,
];
