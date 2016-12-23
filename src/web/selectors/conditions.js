import { createSelector } from 'reselect';

const getConditionsState = state => state.conditions;

export const currentConditions =
  createSelector(getConditionsState, conditions => conditions.current.data);

export default { currentConditions };
