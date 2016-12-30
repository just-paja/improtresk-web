import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getMealsState = state => state.meals;

export const mealsAll = createSelector(getMealsState, meals => meals.data);

export const isValid = state => isStateValid(state.meals);
