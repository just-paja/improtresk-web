import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { shouldFetchList, shouldFetchDetail } from '../selectors/news';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchNewsOnMount() {
  yield takeLatest(
    [
      constants.HOME_MOUNTED,
      constants.NEWS_DETAIL_MOUNTED,
    ],
    fetchResourceIfNeeded,
    api.fetchNews,
    shouldFetchList,
    {
      onStart: constants.NEWS_FETCH_STARTED,
      onSuccess: constants.NEWS_FETCH_SUCCESS,
      onError: constants.NEWS_FETCH_ERROR,
    }
  );
}

export function* fetchNewsDetailOnMount() {
  yield takeLatest(
    constants.NEWS_DETAIL_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchNewsDetail,
    shouldFetchDetail,
    {
      onStart: constants.NEWS_DETAIL_FETCH_STARTED,
      onSuccess: constants.NEWS_DETAIL_FETCH_SUCCESS,
      onError: constants.NEWS_DETAIL_FETCH_ERROR,
    }
  );
}


export default [
  fetchNewsOnMount,
  fetchNewsDetailOnMount,
];
