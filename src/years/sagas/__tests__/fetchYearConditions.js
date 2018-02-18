import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { isConditionsTextRequired } from '../../selectors/yearConditions';
import { yearActiveNumber } from '../../selectors';

import {
  fetchConditions,
  fetchYearsConditions,
} from '..';

import * as api from '../../../api';

describe('Conditions sagas', () => {
  it('fetchConditions creates fetch actions', () => {
    const saga = fetchConditions();
    expect(saga.next().value).toEqual(takeLatest(
      'YEAR_CONDITIONS_REQUIRED',
      fetchYearsConditions
    ));
    expect(saga.next().done).toBe(true);
  });

  it('fetchYearsConditions creates fetch actions', () => {
    const saga = fetchYearsConditions();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(fork(
      fetchResourceIfRequired,
      api.fetchConditionsCurrent,
      {
        isRequired: isConditionsTextRequired,
        actions: {
          start: 'YEAR_CONDITIONS_FETCH_STARTED',
          success: 'YEAR_CONDITIONS_FETCH_SUCCESS',
          fail: 'YEAR_CONDITIONS_FETCH_ERROR',
        },
        params: { year: '2017' },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('fetchYearsConditions creates nothing without year', () => {
    const saga = fetchYearsConditions();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next(null).done).toBe(true);
  });
});
