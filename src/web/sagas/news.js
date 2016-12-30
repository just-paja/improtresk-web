import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchNewsOnHomeMount() {
  yield* takeLatest(
    constants.HOME_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchNews,
    state => state.news.valid,
    {
      onStart: constants.NEWS_FETCH_STARTED,
      onSuccess: constants.NEWS_FETCH_SUCCESS,
      onError: constants.NEWS_FETCH_ERROR,
    }
  );
}

export default [
  fetchNewsOnHomeMount,
];
