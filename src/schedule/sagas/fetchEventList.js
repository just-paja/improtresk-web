import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isScheduleEventListRequired } from '../selectors';
import { yearActiveNumber } from '../../years/selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchScheduleEventList() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(fetchResourceIfRequired, api.fetchScheduleEvents, {
      isRequired: isScheduleEventListRequired,
      actions: {
        start: constants.SCHEDULE_EVENTS_FETCH_STARTED,
        success: constants.SCHEDULE_EVENTS_FETCH_SUCCESS,
        fail: constants.SCHEDULE_EVENTS_FETCH_ERROR,
      },
      params: { year },
    });
  }
}

export function* requireScheduleEventList() {
  yield takeLatest(
    constants.SCHEDULE_EVENTS_REQUIRED,
    fetchScheduleEventList
  );
}

export default [
  requireScheduleEventList,
];
