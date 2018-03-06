import { getData, isRequired, getProgress } from 'react-saga-rest';

export const getMealListState = state => state.food.list;
export const getMealList = getData(getMealListState);
export const getMealListProgress = getProgress(getMealListState);
export const isMealListRequired = isRequired(getMealListState);
