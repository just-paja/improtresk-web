import { getData, getProgress, isRequired } from 'react-saga-rest';

export const getRulesState = state => state.years.rules;

export const getRules = getData(getRulesState);
export const getRulesProgress = getProgress(getRulesState);
export const isRulesTextRequired = isRequired(getRulesState);
