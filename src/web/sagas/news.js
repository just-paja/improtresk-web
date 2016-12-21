import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { ifNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

function* fetchNews() {
  yield put({ type: constants.NEWS_FETCH_STARTED });
  try {
    const res = yield call(api.fetchNews);
    const data = yield res.json();

    yield put({ type: constants.NEWS_FETCH_SUCCESS, data });
  } catch (error) {
    yield put({ type: constants.NEWS_FETCH_ERROR, error });
  }
}

export function* fetchNewsOnHomeMount() {
  yield* takeLatest(constants.HOME_MOUNTED, ifNeeded(fetchNews, state => state.news.valid));
}

export default [
  fetchNewsOnHomeMount,
];
