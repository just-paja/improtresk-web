import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { yearActiveNumber } from '../../../years/selectors';
import { isMealListRequired } from '../../selectors';

import * as api from '../../../api';
import * as sagas from '..';

describe('Meals sagas', () => {
  it('onMealsRequired triggers fetchMeals', () => {
    const saga = sagas.onMealsRequired();
    expect(saga.next().value).toEqual(takeLatest(
      'MEALS_REQUIRED',
      sagas.fetchMeals
    ));
    expect(saga.next().done).toBe(true);
  });

  it('fetchMeals creates fetch actions with year', () => {
    const saga = sagas.fetchMeals();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(
      call(fetchResourceIfRequired, api.fetchMeals, {
        isRequired: isMealListRequired,
        actions: {
          start: 'MEALS_FETCH_STARTED',
          success: 'MEALS_FETCH_SUCCESS',
          fail: 'MEALS_FETCH_ERROR',
        },
        actionData: { year: '2017' },
        params: { year: '2017' },
      })
    );
    expect(saga.next().done).toBe(true);
  });

  it('fetchMeals creates no actions without year', () => {
    const saga = sagas.fetchMeals();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next(null).done).toBe(true);
  });
});
