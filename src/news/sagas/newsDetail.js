import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { getNewsDetailId, isNewsDetailRequired } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchNewsDetail() {
  const newsId = yield select(getNewsDetailId);
  if (newsId) {
    yield call(fetchResourceIfRequired, api.fetchNewsDetail, {
      isRequired: isNewsDetailRequired,
      actions: {
        start: constants.NEWS_DETAIL_FETCH_STARTED,
        success: constants.NEWS_DETAIL_FETCH_SUCCESS,
        fail: constants.NEWS_DETAIL_FETCH_ERROR,
      },
      actionData: { newsId },
      params: { newsId },
    });
  }
}

export function* requireNewsDetail() {
  yield takeEvery(constants.NEWS_DETAIL_REQUIRED, fetchNewsDetail);
}

export default [
  requireNewsDetail,
];
