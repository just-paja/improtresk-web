import { expect } from 'chai';
import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { fetchTextsIfNeeded } from '../../../src/web/sagas/texts';
import { yearActiveNumber } from '../../../src/web/selectors/years';
import { isValid } from '../../../src/web/selectors/schedule';
import {
  bindFetchYearsSchedule,
  bindFetchTexts,
  fetchYearsSchedule,
} from '../../../src/web/sagas/schedule';

import * as api from '../../../src/web/api';

describe('Schedule sagas', () => {
  it('bindFetchTexts binds text fetch to schedule moutn', () => {
    const saga = bindFetchTexts();
    expect(saga.next().value).to.eql(takeLatest(
      'SCHEDULE_MOUNTED',
      fetchTextsIfNeeded,
      [
        'schedule-intro',
      ]
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindFetchYearsSchedule binds fetch to schedule mount', () => {
    const saga = bindFetchYearsSchedule();
    expect(saga.next().value).to.eql(takeLatest(
      'SCHEDULE_MOUNTED',
      fetchYearsSchedule
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsSchedule fetches schedule with year', () => {
    const saga = fetchYearsSchedule();

    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchScheduleEvents,
      isValid,
      {
        onStart: 'SCHEDULE_EVENTS_FETCH_STARTED',
        onSuccess: 'SCHEDULE_EVENTS_FETCH_SUCCESS',
        onError: 'SCHEDULE_EVENTS_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsSchedule fetches nothing without year', () => {
    const saga = fetchYearsSchedule();

    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).done).to.equal(true);
  });
});
