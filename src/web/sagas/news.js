import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

const fetchNewsIfNeeded = fetchResourceIfNeeded(
  api.fetchNews,
  state => state.news.valid,
  {
    onStart: constants.NEWS_FETCH_STARTED,
    onSuccess: constants.NEWS_FETCH_SUCCESS,
    onError: constants.NEWS_FETCH_ERROR,
  }
);

export function* fetchNewsOnHomeMount() {
  yield* takeLatest(constants.HOME_MOUNTED, fetchNewsIfNeeded);
}

export default [
  fetchNewsOnHomeMount,
];
