import { createSelector } from 'reselect';

const getWorkshopsState = state => state.workshops;

export const workshopsAll = createSelector(getWorkshopsState, workshops => workshops.data);

export default { workshopsAll };
