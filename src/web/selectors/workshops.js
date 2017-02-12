import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { findLectorRoleName, getLectorRoles, getLectors } from './lectors';

const getWorkshopDetailState = state => state.workshops.detail;
const getWorkshopListState = state => state.workshops.list;

const mapWorkshop = (lectors, roles) => workshop => ({
  ...workshop,
  lectors: workshop.lectors.map(lectorPosition => ({
    lector: lectors.find(lector => lectorPosition.lector === lector.id),
    role: findLectorRoleName(roles, lectorPosition.role),
  })),
});

export const workshopsDetail = createSelector(
  [getWorkshopDetailState, getLectors, getLectorRoles],
  (workshop, lectors, roles) => mapWorkshop(lectors, roles)(workshop.data)
);
export const workshopsAll = createSelector(
  [getWorkshopListState, getLectors, getLectorRoles],
  (workshops, lectors, roles) => workshops.data.map(mapWorkshop(lectors, roles))
);

export const shouldFetchList = createSelector(
  getWorkshopListState,
  state => isStateValid(state)
);
export const shouldFetchDetail = createSelector(
  getWorkshopDetailState,
  state => isStateValid(state)
);
