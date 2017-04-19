import { expect } from 'chai';
import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { fetchTextsIfNeeded } from '../../../src/web/sagas/texts';
import {
  fetchMealsOnMount,
  fetchTextsOnMount,
  fetchYearsMeals,
} from '../../../src/web/sagas/meals';
import { yearActiveNumber } from '../../../src/web/selectors/years';
import { isValid } from '../../../src/web/selectors/food';

import * as api from '../../../src/web/api';

describe('Meals sagas', () => {
  it('fetchMealsOnMount creates fetch actions', () => {
    const saga = fetchMealsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'FOOD_MOUNTED',
        'REQUEST_PARTICIPANT_DETAILS',
        'PARTICIPANT_FOOD_CHANGE_MOUNTED',
      ],
      fetchYearsMeals
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsMeals creates fetch actions with year', () => {
    const saga = fetchYearsMeals();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchMeals,
      isValid,
      {
        onStart: 'MEALS_FETCH_STARTED',
        onSuccess: 'MEALS_FETCH_SUCCESS',
        onError: 'MEALS_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsMeals creates no actions without year', () => {
    const saga = fetchYearsMeals();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).done).to.equal(true);
  });
  it('fetchTextsOnMount creates fetch actions', () => {
    const saga = fetchTextsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'FOOD_MOUNTED',
      fetchTextsIfNeeded,
      ['food-intro']
    ));
    expect(saga.next().done).to.equal(true);
  });
});
