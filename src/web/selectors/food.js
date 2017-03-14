import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getMealsState = state => state.meals;

export const getMeals = createSelector(getMealsState, meals => meals.data);

export const isValid = state => isStateValid(state.meals);
