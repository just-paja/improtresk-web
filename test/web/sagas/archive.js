import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchArchivedYearOnMount } from '../../../src/web/sagas/archive';
import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { isValid } from '../../../src/web/selectors/archive';

import * as api from '../../../src/web/api';

describe('Archive sagas', () => {
  it('fetchArchivedYearOnMount creates fetch actions', () => {
    const saga = fetchArchivedYearOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'ARCHIVED_YEAR_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchArchivedYear,
      isValid,
      {
        onStart: 'ARCHIVED_YEAR_FETCH_STARTED',
        onSuccess: 'ARCHIVED_YEAR_FETCH_SUCCESS',
        onError: 'ARCHIVED_YEAR_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
});
