import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { getWorkshopCapacity } from './capacity';
import { getLectorRoles, getLectors } from './lectors';
import { getPriceLevels } from './prices';
import { aggregateWorkshopData } from '../transformers/workshops';

const getGeocodeState = state => state.geocode;
const getWorkshopDetailState = state => state.workshops.detail;
const getWorkshopDifficultiesState = state => state.workshops.difficulties;
const getWorkshopListState = state => state.workshops.list;
const getWorkshopLocationsState = state => state.workshops.locations;

export const getWorkshopDifficulties = createSelector(
  getWorkshopDifficultiesState,
  state => state.data
);

export const getWorkshopDetailId = createSelector(
  getWorkshopDetailState,
  state => state.id
);

export const getWorkshopRelatedData = () => [
  getLectors,
  getLectorRoles,
  getWorkshopDifficulties,
  getPriceLevels,
  getWorkshopCapacity,
];

export const workshopsDetail = createSelector(
  [getWorkshopDetailState, ...getWorkshopRelatedData()],
  (detail, lectors, roles, difficulties, priceLevels, capacity) =>
    aggregateWorkshopData(lectors, roles, difficulties, priceLevels, capacity)(detail.data)
);

export const workshopsAll = createSelector(
  [getWorkshopListState, ...getWorkshopRelatedData()],
  (workshops, lectors, roles, difficulties, priceLevels, capacity) =>
    workshops.data.map(
      aggregateWorkshopData(lectors, roles, difficulties, priceLevels, capacity)
    )
);

export const getLocations = createSelector(
  [getWorkshopLocationsState],
  locations => locations.data
);

export const getAddresses = createSelector(
  [getLocations],
  locations => locations.map(location => location.address)
);

export const getLocationMarkers = createSelector(
  [getLocations, getGeocodeState],
  (locations, geocode) => locations
    .filter(location => geocode[location.address] && geocode[location.address].valid)
    .map(location => ({
      ...location,
      ...geocode[location.address].data,
    }))
);

export const shouldFetchList = createSelector(
  getWorkshopListState,
  state => isStateValid(state)
);
export const shouldFetchDetail = createSelector(
  getWorkshopDetailState,
  detail =>
    isStateValid(detail) &&
    detail.data &&
    Number(detail.id) === Number(detail.data.id)
);

export const shouldFetchDifficulties = createSelector(
  getWorkshopDifficultiesState,
  state => isStateValid(state)
);

export const shouldFetchLocations = createSelector(
  getWorkshopLocationsState,
  state => isStateValid(state)
);
