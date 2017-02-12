import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getWorkshopDetailState = state => state.workshops.detail;
const getWorkshopListState = state => state.workshops.list;

export const workshopsDetail = createSelector(getWorkshopDetailState, workshop => workshop.data);
export const workshopsAll = createSelector(getWorkshopListState, workshops => workshops.data);

export const shouldFetchList = createSelector(
  getWorkshopListState,
  state => isStateValid(state)
);
export const shouldFetchDetail = createSelector(
  getWorkshopDetailState,
  state => isStateValid(state)
);
