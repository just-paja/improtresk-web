import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { fetchTextsIfNeeded } from './texts';
import { isValid } from '../selectors/food';
import { yearActiveNumber } from '../selectors/years';

import * as api from '../api';
import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

export function* fetchYearsMeals() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield fork(
      fetchResourceIfNeeded,
      api.fetchMeals,
      isValid,
      {
        onStart: constants.MEALS_FETCH_STARTED,
        onSuccess: constants.MEALS_FETCH_SUCCESS,
        onError: constants.MEALS_FETCH_ERROR,
        year,
      }
    );
  }
}

export function* fetchMealsOnMount() {
  yield takeLatest(
    [
      constants.FOOD_MOUNTED,
      constants.REQUEST_PARTICIPANT_DETAILS,
    ],
    fetchYearsMeals
  );
}

export function* fetchTextsOnMount() {
  yield takeLatest(
    constants.FOOD_MOUNTED,
    fetchTextsIfNeeded,
    [texts.FOOD_INTRO]
  );
}

export default [
  fetchMealsOnMount,
  fetchTextsOnMount,
];
