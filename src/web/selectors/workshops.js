import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { findLectorRoleName, getLectorRoles, getLectors } from './lectors';

const getGeocodeState = state => state.geocode;
const getWorkshopDetailState = state => state.workshops.detail;
const getWorkshopDifficultiesState = state => state.workshops.difficulties;
const getWorkshopListState = state => state.workshops.list;
const getWorkshopLocationsState = state => state.workshops.locations;

const findDifficultyName = (difficulties, id) => {
  const difficulty = difficulties.find(record => record.id === id);
  return difficulty ? difficulty.name : null;
};

export const mapWorkshop = (lectors, roles, difficulties) => workshop => (
  workshop ?
    ({
      ...workshop,
      difficulty: findDifficultyName(difficulties, workshop.difficulty),
      lectors: workshop.lectors.map(lectorPosition => ({
        id: lectorPosition.id,
        lector: lectors.find(lector => lectorPosition.lector === lector.id),
        role: findLectorRoleName(roles, lectorPosition.role),
      })),
    }) : null
);

export const getWorkshopDifficulties = createSelector(
  getWorkshopDifficultiesState,
  state => state.data
);

export const getWorkshopDetailId = createSelector(
  getWorkshopDetailState,
  state => state.id
);

export const workshopsDetail = createSelector(
  [getWorkshopDetailState, getLectors, getLectorRoles, getWorkshopDifficulties],
  (workshop, lectors, roles, difficulties) =>
    mapWorkshop(lectors, roles, difficulties)(workshop.data)
);
export const workshopsAll = createSelector(
  [getWorkshopListState, getLectors, getLectorRoles, getWorkshopDifficulties],
  (workshops, lectors, roles, difficulties) =>
    workshops.data.map(mapWorkshop(lectors, roles, difficulties))
);

export const getLocations = createSelector(
  [getWorkshopLocationsState],
  locations => locations.data
);

export const getAddresses = createSelector(
  [getLocations],
  locations => locations.map(location => location.address)
);

export const areLocationsFetched = createSelector(
  [getWorkshopLocationsState],
  locations => locations.ready
);

export const areLocationsReady = createSelector(
  [areLocationsFetched, getAddresses, getGeocodeState],
  (fetched, addresses, geocode) =>
    fetched &&
    addresses.every(address => !!geocode[address].ready)
);

export const getLocationMarkers = createSelector(
  [getLocations, getGeocodeState],
  (locations, geocode) => locations.map(location => ({
    ...location,
    ...(geocode[location.address] ?
      geocode[location.address].data : {}),
  }))
);

export const shouldFetchList = createSelector(
  getWorkshopListState,
  state => isStateValid(state)
);
export const shouldFetchDetail = createSelector(
  getWorkshopDetailState,
  detail => isStateValid(detail) && detail.data && detail.id === detail.data.id
);

export const shouldFetchDifficulties = createSelector(
  getWorkshopDifficultiesState,
  state => isStateValid(state)
);

export const shouldFetchLocations = createSelector(
  getWorkshopLocationsState,
  state => isStateValid(state)
);
