import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { yearActiveNumber } from '../../years/selectors';
import {
  getPerformerDetailId,
  isPerformerListRequired,
  isPerformerDetailRequired,
} from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchPerformerDetail() {
  const year = yield select(yearActiveNumber);
  const performer = yield select(getPerformerDetailId);
  if (year && performer) {
    yield call(fetchResourceIfRequired, api.fetchPerformerDetail, {
      isRequired: isPerformerDetailRequired,
      actions: {
        start: constants.PERFORMER_DETAIL_FETCH_STARTED,
        success: constants.PERFORMER_DETAIL_FETCH_SUCCESS,
        fail: constants.PERFORMER_DETAIL_FETCH_ERROR,
      },
      params: {
        performer,
        year,
      },
    });
  }
}

export function* fetchPerformerList() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(fetchResourceIfRequired, api.fetchPerformers, {
      isRequired: isPerformerListRequired,
      actions: {
        start: constants.PERFORMERS_FETCH_STARTED,
        success: constants.PERFORMERS_FETCH_SUCCESS,
        fail: constants.PERFORMERS_FETCH_ERROR,
      },
      params: { year },
    });
  }
}

export function* requirePerformerDetail() {
  yield takeEvery(
    constants.PERFORMER_DETAIL_REQUIRED,
    fetchPerformerDetail
  );
}

export function* requirePerformerList() {
  yield takeEvery(
    constants.PERFORMERS_REQUIRED,
    fetchPerformerList
  );
}

export default [
  requirePerformerDetail,
  requirePerformerList,
];
