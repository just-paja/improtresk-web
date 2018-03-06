import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { getNewsDetailId, isNewsDetailRequired } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('News Detail sagas', () => {
  it('fetchNewsDetail creates fetch actions', () => {
    const saga = sagas.fetchNewsDetail();
    expect(saga.next().value).toEqual(select(getNewsDetailId));
    expect(saga.next(45).value).toEqual(
      call(fetchResourceIfRequired, api.fetchNewsDetail, {
        isRequired: isNewsDetailRequired,
        actions: {
          start: 'NEWS_DETAIL_FETCH_STARTED',
          success: 'NEWS_DETAIL_FETCH_SUCCESS',
          fail: 'NEWS_DETAIL_FETCH_ERROR',
        },
        actionData: { newsId: 45 },
        params: { newsId: 45 },
      })
    );
    expect(saga.next().done).toBe(true);
  });

  it('fetchNewsDetail fetches nothing without id', () => {
    const saga = sagas.fetchNewsDetail();
    expect(saga.next().value).toEqual(select(getNewsDetailId));
    expect(saga.next(null).done).toBe(true);
  });

  it('requireNewsDetail creates binds fetch actions', () => {
    const saga = sagas.requireNewsDetail();
    expect(saga.next().value).toEqual(takeEvery(
      'NEWS_DETAIL_REQUIRED',
      sagas.fetchNewsDetail
    ));
    expect(saga.next().done).toBe(true);
  });
});
