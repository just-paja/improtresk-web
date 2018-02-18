import { getData, isRequired } from 'react-saga-rest';

export const getMealListState = state => state.food.list;
export const getMealList = getData(getMealListState);
export const isMealListRequired = isRequired(getMealListState);
