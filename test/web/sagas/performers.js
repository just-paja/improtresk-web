import { expect } from 'chai';
import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import {
  fetchPerformersOnMount,
  fetchYearsPerformers,
} from '../../../src/web/sagas/performers';
import { yearActiveNumber } from '../../../src/web/selectors/years';
import { shouldFetchPerformers } from '../../../src/web/selectors/performers';

import * as api from '../../../src/web/api';

describe('Performers sagas', () => {
  it('fetchPerformersOnMount creates fetch actions', () => {
    const saga = fetchPerformersOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'SCHEDULE_MOUNTED',
      fetchYearsPerformers
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsPerformers creates fetch actions with year', () => {
    const saga = fetchYearsPerformers();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchPerformers,
      shouldFetchPerformers,
      {
        onStart: 'PERFORMERS_FETCH_STARTED',
        onSuccess: 'PERFORMERS_FETCH_SUCCESS',
        onError: 'PERFORMERS_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsPerformers creates no actions without year', () => {
    const saga = fetchYearsPerformers();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).done).to.equal(true);
  });
});
