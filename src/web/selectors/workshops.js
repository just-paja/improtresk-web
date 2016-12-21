import { createSelector } from 'reselect';

const getWorkshopDetailState = state => state.workshopDetail;
const getWorkshopsState = state => state.workshops;

export const workshopsDetail = createSelector(getWorkshopDetailState, workshop => workshop.data);
export const workshopsAll = createSelector(getWorkshopsState, workshops => workshops.data);

export default { workshopsAll };
