import { expect } from 'chai';
import { select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import {
  fetchNewsOnMount,
  fetchNewsDetailOnMount,
} from '../../../src/web/sagas/news';
import {
  getNewsDetailId,
  shouldFetchList,
  shouldFetchDetail,
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
  it('fetchNewsDetailOnMount creates fetch actions with news id', () => {
    const saga = fetchNewsDetailOnMount();
    expect(saga.next().value).to.eql(select(getNewsDetailId));
    expect(saga.next(67).value).to.eql(takeLatest(
      'NEWS_DETAIL_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchNewsDetail,
      shouldFetchDetail,
      {
        onStart: 'NEWS_DETAIL_FETCH_STARTED',
        onSuccess: 'NEWS_DETAIL_FETCH_SUCCESS',
        onError: 'NEWS_DETAIL_FETCH_ERROR',
        news: 67,
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchNewsDetailOnMount creates no action without news id', () => {
    const saga = fetchNewsDetailOnMount();
    expect(saga.next().value).to.eql(select(getNewsDetailId));
    expect(saga.next().done).to.equal(true);
  });
});
