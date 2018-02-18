import { call, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isNewsListRequired } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchNewsList() {
  yield call(fetchResourceIfRequired, api.fetchNews, {
    isRequired: isNewsListRequired,
    actions: {
      start: constants.NEWS_FETCH_STARTED,
      success: constants.NEWS_FETCH_SUCCESS,
      fail: constants.NEWS_FETCH_ERROR,
    },
  });
}

export function* requireNewsList() {
  yield takeLatest(constants.NEWS_REQUIRED, fetchNewsList);
}

export default [
  requireNewsList,
];
