import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import {
  requireWorkshops,
  requireWorkshopDetail,
  requireWorkshopDifficulties,
  requireWorkshopLocations,
  fetchWorkshopDetail,
  requireYearsWorkshops,
  requireYearsWorkshopLocations,
} from '..';
import { yearActiveNumber } from '../../../years/selectors';
import {
  getWorkshopDetailId,
  isDifficultyListRequired,
  isLocationListRequired,
  isWorkshopDetailRequired,
  isWorkshopListRequired,
} from '../../selectors';

import * as api from '../../../api';

describe('Workshop sagas', () => {
  it('requireWorkshopDifficulties creates fetch actions', () => {
    const saga = requireWorkshopDifficulties();
    expect(saga.next().value).toEqual(takeEvery(
      'WORKSHOP_DIFFICULTIES_REQUIRED',
      fetchResourceIfRequired,
      api.fetchWorkshopDifficulties,
      {
        isRequired: isDifficultyListRequired,
        actions: {
          start: 'WORKSHOP_DIFFICULTIES_FETCH_STARTED',
          success: 'WORKSHOP_DIFFICULTIES_FETCH_SUCCESS',
          fail: 'WORKSHOP_DIFFICULTIES_FETCH_ERROR',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireWorkshopLocations creates fetch actions', () => {
    const saga = requireWorkshopLocations();
    expect(saga.next().value).toEqual(takeEvery(
      'WORKSHOP_LOCATIONS_REQUIRED',
      requireYearsWorkshopLocations
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireWorkshops creates fetch actions', () => {
    const saga = requireWorkshops();
    expect(saga.next().value).toEqual(takeEvery(
      'WORKSHOPS_REQUIRED',
      requireYearsWorkshops
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireWorkshopDetail creates fetch actions', () => {
    const saga = requireWorkshopDetail();
    expect(saga.next().value).toEqual(takeEvery(
      'WORKSHOP_DETAIL_REQUIRED',
      fetchWorkshopDetail
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireYearsWorkshopLocations creates fetch actions with year', () => {
    const saga = requireYearsWorkshopLocations();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchWorkshopLocations,
      {
        isRequired: isLocationListRequired,
        actions: {
          start: 'WORKSHOP_LOCATIONS_FETCH_STARTED',
          success: 'WORKSHOP_LOCATIONS_FETCH_SUCCESS',
          fail: 'WORKSHOP_LOCATIONS_FETCH_ERROR',
        },
        params: {
          year: '2017',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireYearsWorkshopLocations creates no actions without year', () => {
    const saga = requireYearsWorkshopLocations();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next(null).done).toBe(true);
  });

  it('requireYearsWorkshops creates fetch actions with year', () => {
    const saga = requireYearsWorkshops();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchWorkshops,
      {
        isRequired: isWorkshopListRequired,
        actions: {
          start: 'WORKSHOPS_FETCH_STARTED',
          success: 'WORKSHOPS_FETCH_SUCCESS',
          fail: 'WORKSHOPS_FETCH_ERROR',
        },
        params: {
          year: '2017',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireYearsWorkshops creates no actions without year', () => {
    const saga = requireYearsWorkshops();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next(null).done).toBe(true);
  });

  it('fetchWorkshopDetail creates fetch actions with year', () => {
    const saga = fetchWorkshopDetail();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(select(getWorkshopDetailId));
    expect(saga.next(24).value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchWorkshopDetail,
      {
        isRequired: isWorkshopDetailRequired,
        actions: {
          start: 'WORKSHOP_DETAIL_FETCH_STARTED',
          success: 'WORKSHOP_DETAIL_FETCH_SUCCESS',
          fail: 'WORKSHOP_DETAIL_FETCH_ERROR',
        },
        params: {
          year: '2017',
          workshop: 24,
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('fetchWorkshopDetail creates no actions without year', () => {
    const saga = fetchWorkshopDetail();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next(null).value).toEqual(select(getWorkshopDetailId));
    expect(saga.next(null).done).toBe(true);
  });
});
