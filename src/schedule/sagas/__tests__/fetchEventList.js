import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { yearActiveNumber } from '../../../years/selectors';
import { isScheduleEventListRequired } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('Schedule sagas', () => {
  it('requireScheduleEventList binds fetch to schedule mount', () => {
    const gen = sagas.requireScheduleEventList();
    expect(gen.next().value).toEqual(takeLatest(
      'SCHEDULE_EVENTS_REQUIRED',
      sagas.fetchScheduleEventList
    ));
    expect(gen.next().done).toBe(true);
  });

  it('fetchScheduleEventList fetches schedule with year', () => {
    const gen = sagas.fetchScheduleEventList();

    expect(gen.next().value).toEqual(select(yearActiveNumber));
    expect(gen.next('2017').value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchScheduleEvents,
      {
        isRequired: isScheduleEventListRequired,
        actions: {
          start: 'SCHEDULE_EVENTS_FETCH_STARTED',
          success: 'SCHEDULE_EVENTS_FETCH_SUCCESS',
          fail: 'SCHEDULE_EVENTS_FETCH_ERROR',
        },
        params: {
          year: '2017',
        },
      })
    );
    expect(gen.next().done).toBe(true);
  });

  it('fetchScheduleEventList fetches nothing without year', () => {
    const gen = sagas.fetchScheduleEventList();

    expect(gen.next().value).toEqual(select(yearActiveNumber));
    expect(gen.next(null).done).toBe(true);
  });
});
