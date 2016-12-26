import { createSelector } from 'reselect';

const getFoodTimesState = state => state.foodTimes;

export const foodTimesAll = createSelector(getFoodTimesState, foodTimes => foodTimes.data);

export default { foodTimesAll };
