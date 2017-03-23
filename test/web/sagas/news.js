import { expect } from 'chai';
import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import {
  fetchNewsOnMount,
  fetchNewsDetail,
  fetchNewsDetailOnMount,
} from '../../../src/web/sagas/news';
import {
  getNewsDetailId,
  shouldFetchDetail,
  shouldFetchList,
} from '../../../src/web/selectors/news';

import * as api from '../../../src/web/api';

describe('News sagas', () => {
  it('fetchNewsOnMount creates fetch actions', () => {
    const saga = fetchNewsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'HOME_MOUNTED',
        'NEWS_DETAIL_MOUNTED',
      ],
      fetchResourceIfNeeded,
      api.fetchNews,
      shouldFetchList,
      {
        onStart: 'NEWS_FETCH_STARTED',
        onSuccess: 'NEWS_FETCH_SUCCESS',
        onError: 'NEWS_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchNewsDetail creates fetch actions', () => {
    const saga = fetchNewsDetail();
    expect(saga.next().value).to.eql(select(getNewsDetailId));
    expect(saga.next(45).value).to.eql(call(
      fetchResourceIfNeeded,
      api.fetchNewsDetail,
      shouldFetchDetail,
      {
        onStart: 'NEWS_DETAIL_FETCH_STARTED',
        onSuccess: 'NEWS_DETAIL_FETCH_SUCCESS',
        onError: 'NEWS_DETAIL_FETCH_ERROR',
        news: 45,
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchNewsDetailOnMount creates binds fetch actions', () => {
    const saga = fetchNewsDetailOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'NEWS_DETAIL_MOUNTED',
      fetchNewsDetail
    ));
    expect(saga.next().done).to.equal(true);
  });
});
