import { isRequired, getData } from 'react-saga-rest';

export const getConditionsState = state => state.years.conditions;
export const getConditions = getData(getConditionsState);
export const isConditionsTextRequired = isRequired(getConditionsState);
