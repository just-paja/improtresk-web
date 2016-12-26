import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getConditionsState = state => state.conditions;

export const currentConditions =
  createSelector(getConditionsState, conditions => conditions.current.data);

export const isValid = state => (state.conditions ?
  isStateValid(state.conditions.current) : false);
