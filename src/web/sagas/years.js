import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as api from '../../api';
import * as constants from '../constants/actions';

function* fetchYears() {
  yield put({ type: constants.YEARS_FETCH_STARTED });
  try {
    const res = yield call(api.fetchYears);
    const data = yield res.json();

    yield put({ type: constants.YEARS_FETCH_SUCCESS, data });
  } catch (error) {
    yield put({ type: constants.YEARS_FETCH_ERROR, error });
  }
}

export function* fetchYearsOnMount() {
  yield* takeLatest(constants.APP_MOUNTED, fetchYears);
}

export default [
  fetchYearsOnMount,
];
