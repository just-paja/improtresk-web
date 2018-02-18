import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { getCurrent, isArchiveRequired } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('Archive sagas', () => {
  it('fetchArchivedYear creates fetch actions', () => {
    const saga = sagas.fetchArchivedYear();
    expect(saga.next().value).toEqual(select(getCurrent));
    expect(saga.next('2017').value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchArchivedYear,
      {
        isRequired: isArchiveRequired,
        actions: {
          start: 'YEAR_ARCHIVE_DETAIL_FETCH_STARTED',
          success: 'YEAR_ARCHIVE_DETAIL_FETCH_SUCCESS',
          fail: 'YEAR_ARCHIVE_DETAIL_FETCH_ERROR',
        },
        params: {
          year: '2017',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireArchivedYear creates fetch actions', () => {
    const saga = sagas.requireArchivedYear();
    expect(saga.next().value).toEqual(takeLatest(
      'YEAR_ARCHIVE_DETAIL_REQUIRED',
      sagas.fetchArchivedYear
    ));
    expect(saga.next().done).toBe(true);
  });
});
