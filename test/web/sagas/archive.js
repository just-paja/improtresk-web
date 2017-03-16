import { expect } from 'chai';
import { fork, select, takeLatest } from 'redux-saga/effects';

import { bindFetchArchivedYear, fetchArchivedYear } from '../../../src/web/sagas/archive';
import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { getCurrent, isValid } from '../../../src/web/selectors/archive';

import * as api from '../../../src/web/api';

describe('Archive sagas', () => {
  it('fetchArchivedYear creates fetch actions', () => {
    const saga = fetchArchivedYear();
    expect(saga.next().value).to.eql(select(getCurrent));
    expect(saga.next('2017').value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchArchivedYear,
      isValid,
      {
        onStart: 'ARCHIVED_YEAR_FETCH_STARTED',
        onSuccess: 'ARCHIVED_YEAR_FETCH_SUCCESS',
        onError: 'ARCHIVED_YEAR_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });

  it('bindFetchArchivedYear creates fetch actions', () => {
    const saga = bindFetchArchivedYear();
    expect(saga.next().value).to.eql(takeLatest(
      'ARCHIVED_YEAR_MOUNTED',
      fetchArchivedYear
    ));
    expect(saga.next().done).to.equal(true);
  });
});
