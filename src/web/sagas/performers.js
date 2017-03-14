import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { yearActiveNumber } from '../selectors/years';
import {
  getPerformerDetailId,
  shouldFetchPerformers,
  shouldFetchDetail,
} from '../selectors/performers';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchYearsPerformers() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield fork(
      fetchResourceIfNeeded,
      api.fetchPerformers,
      shouldFetchPerformers,
      {
        onStart: constants.PERFORMERS_FETCH_STARTED,
        onSuccess: constants.PERFORMERS_FETCH_SUCCESS,
        onError: constants.PERFORMERS_FETCH_ERROR,
        year,
      }
    );
  }
}

export function* fetchPerformersOnMount() {
  yield takeLatest(
    constants.SCHEDULE_MOUNTED,
    fetchYearsPerformers
  );
}

export function* fetchPerformerDetail() {
  const year = yield select(yearActiveNumber);
  const performer = yield select(getPerformerDetailId);
  if (year && performer) {
    yield fork(
      fetchResourceIfNeeded,
      api.fetchPerformerDetail,
      shouldFetchDetail,
      {
        onStart: constants.PERFORMER_DETAIL_FETCH_STARTED,
        onSuccess: constants.PERFORMER_DETAIL_FETCH_SUCCESS,
        onError: constants.PERFORMER_DETAIL_FETCH_ERROR,
        year,
        performer,
      }
    );
  }
}

export function* fetchPerformerDetailOnMount() {
  yield takeLatest(
    constants.PERFORMER_DETAIL_MOUNTED,
    fetchPerformerDetail
  );
}

export default [
  fetchPerformersOnMount,
  fetchPerformerDetailOnMount,
];
