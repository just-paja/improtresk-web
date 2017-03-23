import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { fetchTextsIfNeeded } from './texts';
import { isValid } from '../selectors/schedule';
import { yearActiveNumber } from '../selectors/years';

import * as api from '../api';
import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

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

export function* bindFetchTexts() {
  yield takeLatest(
    constants.SCHEDULE_MOUNTED,
    fetchTextsIfNeeded,
    [
      texts.SCHEDULE_INTRO,
    ]

  );
}

export default [
  bindFetchYearsSchedule,
  bindFetchTexts,
];
