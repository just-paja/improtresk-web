import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isMealListRequired } from '../selectors';
import { yearActiveNumber } from '../../years/selectors';

import * as api from '../../api';
import {
  MEALS_FETCH_ERROR,
  MEALS_FETCH_STARTED,
  MEALS_FETCH_SUCCESS,
  MEALS_REQUIRED,
} from '../constants';

export function* fetchMeals() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(fetchResourceIfRequired, api.fetchMeals, {
      isRequired: isMealListRequired,
      actions: {
        start: MEALS_FETCH_STARTED,
        success: MEALS_FETCH_SUCCESS,
        fail: MEALS_FETCH_ERROR,
      },
      params: { year },
      actionData: { year },
    });
  }
}

export function* onMealsRequired() {
  yield takeEvery(MEALS_REQUIRED, fetchMeals);
}

export default [
  onMealsRequired,
];
