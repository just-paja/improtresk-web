import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getFoodTimesState = state => state.foodTimes;

export const foodTimesAll = createSelector(getFoodTimesState, foodTimes => foodTimes.data);

export const isValid = state => isStateValid(state.foodTimes);
