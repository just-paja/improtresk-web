import { call, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { isNewsListRequired } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('News sagas', () => {
  it('fetchNewsList creates fetch actions', () => {
    const gen = sagas.fetchNewsList();
    expect(gen.next().value).toEqual(
      call(fetchResourceIfRequired, api.fetchNews, {
        isRequired: isNewsListRequired,
        actions: {
          start: 'NEWS_FETCH_STARTED',
          success: 'NEWS_FETCH_SUCCESS',
          fail: 'NEWS_FETCH_ERROR',
        },
      })
    );
    expect(gen.next().done).toBe(true);
  });

  it('requireNewsList fetches news', () => {
    const gen = sagas.requireNewsList();
    expect(gen.next().value).toEqual(takeLatest(
      'NEWS_REQUIRED',
      sagas.fetchNewsList
    ));
    expect(gen.next().done).toBeTruthy();
  });
});
