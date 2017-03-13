import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { fetchTextsIfNeeded } from '../../../src/web/sagas/texts';
import {
  fetchMealsOnMount,
  fetchTextsOnMount,
} from '../../../src/web/sagas/meals';
import { isValid } from '../../../src/web/selectors/food';

import * as api from '../../../src/web/api';

describe('Meals sagas', () => {
  it('fetchMealsOnMount creates fetch actions', () => {
    const saga = fetchMealsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'FOOD_MOUNTED',
        'REQUEST_PARTICIPANT_DETAILS',
      ],
      fetchResourceIfNeeded,
      api.fetchMeals,
      isValid,
      {
        onStart: 'MEALS_FETCH_STARTED',
        onSuccess: 'MEALS_FETCH_SUCCESS',
        onError: 'MEALS_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
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
