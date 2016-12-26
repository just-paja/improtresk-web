import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';
import { fetchTextsIfNeeded } from './texts';

import * as api from '../../api';
import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

export function* fetchFoodTimesOnMount() {
  yield* takeLatest(
    constants.FOOD_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchFoodTimes,
    state => state.foodTimes.valid,
    {
      onStart: constants.FOOD_TIMES_FETCH_STARTED,
      onSuccess: constants.FOOD_TIMES_FETCH_SUCCESS,
      onError: constants.FOOD_TIMES_FETCH_ERROR,
    }
  );
}

export function* fetchTextsOnMount() {
  yield* takeLatest(
    constants.FOOD_MOUNTED,
    fetchTextsIfNeeded,
    [texts.FOOD_INTRO]
  );
}

export default [
  fetchFoodTimesOnMount,
  fetchTextsOnMount,
];
