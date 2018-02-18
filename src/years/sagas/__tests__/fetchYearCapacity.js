import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/lib';

import { fetchResource } from '../../../sagas/api';
import { isPolling } from '../../selectors/yearCapacity';
import { yearActiveNumber } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('Capacity sagas', () => {
  it('requireCapacity binds poll capacity start', () => {
    const saga = sagas.requireCapacity();
    expect(saga.next().value).toEqual(takeLatest(
      'YEAR_CAPACITY_REQUIRED',
      sagas.fetchCapacity
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requirePollCapacityStop binds poll capacity stop', () => {
    const saga = sagas.requirePollCapacityStop();
    expect(saga.next().value).toEqual(takeLatest(
      'YEAR_CAPACITY_POLL_STOP_REQUIRED',
      sagas.pollCapacityStop
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requirePollCapacity binds poll capacity renew', () => {
    const saga = sagas.requirePollCapacity();
    expect(saga.next().value).toEqual(takeLatest(
      'YEAR_CAPACITY_POLL_CYCLE_FINISHED',
      sagas.pollCapacity
    ));
    expect(saga.next().done).toBe(true);
  });

  it('pollCapacityStop stops polling', () => {
    const saga = sagas.pollCapacityStop();
    expect(saga.next().value).toEqual(put({
      type: 'YEAR_CAPACITY_POLL_STOP',
    }));
    expect(saga.next().done).toBe(true);
  });

  it('pollCapacityStart start polling when not polling', () => {
    const saga = sagas.pollCapacityStart();

    expect(saga.next().value).toEqual(select(isPolling));
    expect(saga.next(false).value).toEqual(put({
      type: 'YEAR_CAPACITY_POLL_START',
    }));
    expect(saga.next().value).toEqual(fork(sagas.pollCapacity));
    expect(saga.next().done).toBe(true);
  });

  it('pollCapacityStart does not start polling when already polling', () => {
    const saga = sagas.pollCapacityStart();

    expect(saga.next().value).toEqual(select(isPolling));
    expect(saga.next(true).done).toBe(true);
  });

  it('pollCapacity does nothing without year', () => {
    const saga = sagas.pollCapacity();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next(null).done).toBe(true);
  });

  it('pollCapacity fetches capacity and stops when stopped', () => {
    const saga = sagas.pollCapacity();

    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(call(
      fetchResource,
      api.fetchCapacity,
      {
        actions: {
          start: 'YEAR_CAPACITY_UPDATE_STARTED',
          success: 'YEAR_CAPACITY_UPDATE_SUCCESS',
          fail: 'YEAR_CAPACITY_UPDATE_ERROR',
        },
        params: {
          year: '2017',
        },
      }
    ));
    expect(saga.next().value).toEqual(call(delay, 8000));
    expect(saga.next().value).toEqual(select(isPolling));
    expect(saga.next(false).done).toBe(true);
  });

  it('pollCapacity fetches capacity and renews the cycle', () => {
    const saga = sagas.pollCapacity();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(call(
      fetchResource,
      api.fetchCapacity,
      {
        actions: {
          start: 'YEAR_CAPACITY_UPDATE_STARTED',
          success: 'YEAR_CAPACITY_UPDATE_SUCCESS',
          fail: 'YEAR_CAPACITY_UPDATE_ERROR',
        },
        params: {
          year: '2017',
        },
      }
    ));
    expect(saga.next().value).toEqual(call(delay, 8000));
    expect(saga.next().value).toEqual(select(isPolling));
    expect(saga.next(true).value).toEqual(put({
      type: 'YEAR_CAPACITY_POLL_CYCLE_FINISHED',
    }));
    expect(saga.next().done).toBe(true);
  });
});
