import { expect } from 'chai';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/lib';

import { fetchResource } from '../../../src/web/sagas/common';
import { isPolling } from '../../../src/web/selectors/capacity';
import { yearActiveNumber } from '../../../src/web/selectors/years';
import {
  bindPollCapacity,
  bindPollCapacityStart,
  bindPollCapacityStop,
  pollCapacity,
  pollCapacityStart,
  pollCapacityStop,
} from '../../../src/web/sagas/capacity';

import * as api from '../../../src/web/api';

describe('Capacity sagas', () => {
  it('bindPollCapacityStart binds poll capacity start', () => {
    const saga = bindPollCapacityStart();
    expect(saga.next().value).to.eql(takeLatest(
      'ORDER_FORM_MOUNTED',
      pollCapacityStart
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindPollCapacityStop binds poll capacity stop', () => {
    const saga = bindPollCapacityStop();
    expect(saga.next().value).to.eql(takeLatest(
      'ORDER_FORM_UNMOUNTED',
      pollCapacityStop
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindPollCapacity binds poll capacity renew', () => {
    const saga = bindPollCapacity();
    expect(saga.next().value).to.eql(takeLatest(
      'YEAR_CAPACITY_POLL_CYCLE_FINISHED',
      pollCapacity
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('pollCapacityStop stops polling', () => {
    const saga = pollCapacityStop();
    expect(saga.next().value).to.eql(put({
      type: 'YEAR_CAPACITY_POLL_STOP',
    }));
    expect(saga.next().done).to.equal(true);
  });
  it('pollCapacityStart start polling when not polling', () => {
    const saga = pollCapacityStart();

    expect(saga.next().value).to.eql(select(isPolling));
    expect(saga.next(false).value).to.eql(put({
      type: 'YEAR_CAPACITY_POLL_START',
    }));
    expect(saga.next().value).to.eql(fork(pollCapacity));
    expect(saga.next().done).to.equal(true);
  });
  it('pollCapacityStart does not start polling when already polling', () => {
    const saga = pollCapacityStart();

    expect(saga.next().value).to.eql(select(isPolling));
    expect(saga.next(true).done).to.equal(true);
  });
  it('pollCapacity does nothing without year', () => {
    const saga = pollCapacity();

    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).done).to.equal(true);
  });
  it('pollCapacity fetches capacity and stops when stopped', () => {
    const saga = pollCapacity();

    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(call(
      fetchResource,
      api.fetchCapacity,
      {
        onStart: 'YEAR_CAPACITY_FETCH_STARTED',
        onSuccess: 'YEAR_CAPACITY_FETCH_SUCCESS',
        onError: 'YEAR_CAPACITY_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().value).to.eql(call(delay, 10000));
    expect(saga.next().value).to.eql(select(isPolling));
    expect(saga.next(false).done).to.equal(true);
  });
  it('pollCapacity fetches capacity and renews the cycle', () => {
    const saga = pollCapacity();

    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(call(
      fetchResource,
      api.fetchCapacity,
      {
        onStart: 'YEAR_CAPACITY_FETCH_STARTED',
        onSuccess: 'YEAR_CAPACITY_FETCH_SUCCESS',
        onError: 'YEAR_CAPACITY_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().value).to.eql(call(delay, 10000));
    expect(saga.next().value).to.eql(select(isPolling));
    expect(saga.next(true).value).to.eql(put({
      type: 'YEAR_CAPACITY_POLL_CYCLE_FINISHED',
    }));
    expect(saga.next().done).to.equal(true);
  });
});
