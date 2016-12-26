import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getWorkshopDetailState = state => state.workshopDetail;
const getWorkshopsState = state => state.workshops;

export const workshopsDetail = createSelector(getWorkshopDetailState, workshop => workshop.data);
export const workshopsAll = createSelector(getWorkshopsState, workshops => workshops.data);

export const shouldFetchList = state => isStateValid(state.workshops);
export const shouldFetchDetail = state => isStateValid(state.workshopDetail);

export default { workshopsAll };
