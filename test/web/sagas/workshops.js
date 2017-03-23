import { expect } from 'chai';
import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import {
  requireWorkshops,
  requireWorkshopDetail,
  requireWorkshopDifficulties,
  requireWorkshopLocations,
  requireYearsWorkshopDetail,
  requireYearsWorkshops,
  requireYearsWorkshopLocations,
} from '../../../src/web/sagas/workshops';
import { yearActiveNumber } from '../../../src/web/selectors/years';
import {
  getWorkshopDetailId,
  shouldFetchList,
  shouldFetchDetail,
  shouldFetchDifficulties,
  shouldFetchLocations,
} from '../../../src/web/selectors/workshops';

import * as api from '../../../src/web/api';

describe('Workshop sagas', () => {
  it('requireWorkshopDifficulties creates fetch actions', () => {
    const saga = requireWorkshopDifficulties();
    expect(saga.next().value).to.eql(takeLatest(
      'APP_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchWorkshopDifficulties,
      shouldFetchDifficulties,
      {
        onStart: 'WORKSHOP_DIFFICULTIES_FETCH_STARTED',
        onSuccess: 'WORKSHOP_DIFFICULTIES_FETCH_SUCCESS',
        onError: 'WORKSHOP_DIFFICULTIES_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireWorkshopLocations creates fetch actions', () => {
    const saga = requireWorkshopLocations();
    expect(saga.next().value).to.eql(takeLatest(
      'REQUEST_WORKSHOP_LOCATIONS',
      requireYearsWorkshopLocations
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireWorkshops creates fetch actions', () => {
    const saga = requireWorkshops();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'WORKSHOPS_MOUNTED',
        'SCHEDULE_MOUNTED',
        'REQUEST_PARTICIPANT_DETAILS',
      ],
      requireYearsWorkshops
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireWorkshopDetail creates fetch actions', () => {
    const saga = requireWorkshopDetail();
    expect(saga.next().value).to.eql(takeLatest(
      'WORKSHOP_DETAIL_MOUNTED',
      requireYearsWorkshopDetail
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireYearsWorkshopLocations creates fetch actions with year', () => {
    const saga = requireYearsWorkshopLocations();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchWorkshopLocations,
      shouldFetchLocations,
      {
        onStart: 'WORKSHOP_LOCATIONS_FETCH_STARTED',
        onSuccess: 'WORKSHOP_LOCATIONS_FETCH_SUCCESS',
        onError: 'WORKSHOP_LOCATIONS_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireYearsWorkshopLocations creates no actions without year', () => {
    const saga = requireYearsWorkshopLocations();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).done).to.equal(true);
  });
  it('requireYearsWorkshops creates fetch actions with year', () => {
    const saga = requireYearsWorkshops();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchWorkshops,
      shouldFetchList,
      {
        onStart: 'WORKSHOPS_FETCH_STARTED',
        onSuccess: 'WORKSHOPS_FETCH_SUCCESS',
        onError: 'WORKSHOPS_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireYearsWorkshops creates no actions without year', () => {
    const saga = requireYearsWorkshops();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).done).to.equal(true);
  });
  it('requireYearsWorkshopDetail creates fetch actions with year', () => {
    const saga = requireYearsWorkshopDetail();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(select(getWorkshopDetailId));
    expect(saga.next(24).value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchWorkshopDetail,
      shouldFetchDetail,
      {
        onStart: 'WORKSHOP_DETAIL_FETCH_STARTED',
        onSuccess: 'WORKSHOP_DETAIL_FETCH_SUCCESS',
        onError: 'WORKSHOP_DETAIL_FETCH_ERROR',
        year: '2017',
        workshop: 24,
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireYearsWorkshopDetail creates no actions without year', () => {
    const saga = requireYearsWorkshopDetail();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).value).to.eql(select(getWorkshopDetailId));
    expect(saga.next(null).done).to.equal(true);
  });
});
