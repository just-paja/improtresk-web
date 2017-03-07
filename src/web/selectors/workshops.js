import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { findLectorRoleName, getLectorRoles, getLectors } from './lectors';
import { getPriceLevels } from './prices';

const getGeocodeState = state => state.geocode;
const getWorkshopDetailState = state => state.workshops.detail;
const getWorkshopDifficultiesState = state => state.workshops.difficulties;
const getWorkshopListState = state => state.workshops.list;
const getWorkshopLocationsState = state => state.workshops.locations;

const findDifficultyName = (difficulties, id) => {
  const difficulty = difficulties.find(record => record.id === id);
  return difficulty ? difficulty.name : null;
};

const mapPrices = priceLevels => (priceItem) => {
  const priceLevelId = priceItem.price_level;
  const priceLevel = priceLevels.find(priceLevelItem => priceLevelItem.id === priceLevelId);
  if (priceLevel) {
    return {
      price: priceItem.price,
      level: priceLevel.name,
      takesEffectOn: priceLevel.takesEffectOn,
      endsOn: priceLevel.endsOn,
    };
  }
  return null;
};

const mapWorkshopPrices = (prices, priceLevels) => (
  prices && priceLevels ?
    prices
      .map(mapPrices(priceLevels))
      .filter(item => item) : []
);

export const mapWorkshop = (lectors, roles, difficulties, priceLevels) => workshop => (
  workshop ?
    ({
      ...workshop,
      difficulty: findDifficultyName(difficulties, workshop.difficulty),
      lectors: workshop.lectors.map(lectorPosition => ({
        id: lectorPosition.id,
        lector: lectors.find(lector => lectorPosition.lector === lector.id),
        role: findLectorRoleName(roles, lectorPosition.role),
      })),
      prices: mapWorkshopPrices(workshop.prices, priceLevels),
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
  [getWorkshopDetailState, getLectors, getLectorRoles, getWorkshopDifficulties, getPriceLevels],
  (workshop, lectors, roles, difficulties, priceLevels) =>
    mapWorkshop(lectors, roles, difficulties, priceLevels)(workshop.data)
);
export const workshopsAll = createSelector(
  [getWorkshopListState, getLectors, getLectorRoles, getWorkshopDifficulties, getPriceLevels],
  (workshops, lectors, roles, difficulties, priceLevels) =>
    workshops.data.map(mapWorkshop(lectors, roles, difficulties, priceLevels))
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
