import { call, put, select, takeEvery } from 'redux-saga/effects';

import { requirePerformerList } from '../../performers/actions';
import { requireWorkshopList } from '../../workshops/actions';
import { fetchResourceIfRequired } from '../../sagas/api';
import { isScheduleEventListRequired } from '../selectors';
import { yearActiveNumber } from '../../years/selectors';

import * as api from '../../api';
import * as constants from '../constants';

function* fetchScheduleEventList() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield put(requirePerformerList());
    yield put(requireWorkshopList());
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

function* requireScheduleEventList() {
  yield takeEvery(
    constants.SCHEDULE_EVENTS_REQUIRED,
    fetchScheduleEventList
  );
}

export default [
  requireScheduleEventList,
];
