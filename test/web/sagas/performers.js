import { expect } from 'chai';
import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import {
  fetchPerformerDetail,
  fetchPerformerDetailOnMount,
  fetchPerformersOnMount,
  fetchYearsPerformers,
} from '../../../src/web/sagas/performers';
import { yearActiveNumber } from '../../../src/web/selectors/years';
import {
  getPerformerDetailId,
  shouldFetchPerformers,
  shouldFetchDetail,
} from '../../../src/web/selectors/performers';

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
  it('fetchPerformerDetailOnMount creates fetch actions', () => {
    const saga = fetchPerformerDetailOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'PERFORMER_DETAIL_MOUNTED',
      fetchPerformerDetail
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
  it('fetchPerformerDetail creates fetch actions with year', () => {
    const saga = fetchPerformerDetail();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(select(getPerformerDetailId));
    expect(saga.next(24).value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchPerformerDetail,
      shouldFetchDetail,
      {
        onStart: 'PERFORMER_DETAIL_FETCH_STARTED',
        onSuccess: 'PERFORMER_DETAIL_FETCH_SUCCESS',
        onError: 'PERFORMER_DETAIL_FETCH_ERROR',
        year: '2017',
        performer: 24,
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchPerformerDetail creates no actions without year', () => {
    const saga = fetchPerformerDetail();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).value).to.eql(select(getPerformerDetailId));
    expect(saga.next(null).done).to.equal(true);
  });
});
