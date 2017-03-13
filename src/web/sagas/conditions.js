import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { isValid } from '../selectors/conditions';
import { yearActiveNumber } from '../selectors/years';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchYearsConditions() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield fork(
      fetchResourceIfNeeded,
      api.fetchConditionsCurrent,
      isValid,
      {
        onStart: constants.CONDITIONS_CURRENT_FETCH_STARTED,
        onSuccess: constants.CONDITIONS_CURRENT_FETCH_SUCCESS,
        onError: constants.CONDITIONS_CURRENT_FETCH_ERROR,
        year,
      }
    );
  }
}
export function* fetchConditions() {
  yield takeLatest(
    constants.CONDITIONS_MOUNTED,
    fetchYearsConditions
  );
}

export default [
  fetchConditions,
];
