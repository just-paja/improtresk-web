import { createSelector } from 'reselect';
import { isRequired, getData, getProp, transformData } from 'react-saga-rest';

import { getLectorRolesState, getLectorListState } from './lectors';
import { aggregateCapacityData, getWorkshopCapacity, getPriceLevels } from '../../years/selectors';

export const getDifficultiesState = state => state.workshops.difficulties;
export const getGeocodeState = state => state.geocode;
export const getLocationsState = state => state.workshops.locations;
export const getWorkshopDetailState = state => state.workshops.detail;
export const getWorkshopListState = state => state.workshops.list;

export const isDifficultyListRequired = isRequired(getDifficultiesState);
export const isLocationListRequired = isRequired(getLocationsState);
export const isWorkshopDetailRequired = isRequired(getWorkshopDetailState);
export const isWorkshopListRequired = isRequired(getWorkshopListState);

export const getDifficultyList = getData(getDifficultiesState);
export const getWorkshopDetailId = getProp(getWorkshopDetailState, 'id');

export const getWorkshopRelatedData = () => [
  getLectorListState,
  getLectorRolesState,
  getDifficultyList,
  getPriceLevels,
  getWorkshopCapacity,
];

export const getLocations = getData(getLocationsState);

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

export const findLectorRoleName = (roles, id) => {
  if (roles) {
    const role = roles.find(roleRecord => roleRecord.id === id);
    return role ? role.name : null;
  }
  return null;
};

export const transformLectorRole = (lectors, roles) => (lectorPosition) => {
  if (lectorPosition && lectors && roles) {
    const lector = lectors.find(lectorItem => lectorPosition.lector === lectorItem.id);
    const role = findLectorRoleName(roles, lectorPosition.role);
    if (lector && role) {
      return {
        id: lectorPosition.id,
        lector,
        role,
      };
    }
  }
  return null;
};

export const transformLectorRoles = (workshop, lectorsAndRoles) => (workshop ? ({
  ...workshop,
  lectors: workshop.lectors
    .map(transformLectorRole(lectorsAndRoles.lectors, lectorsAndRoles.roles))
    .filter(item => item),
}) : null);

export const transformWorkshopDifficultyName = (workshop, difficulties) => (workshop ? ({
  ...workshop,
  difficulty: difficulties.find(record => record.id === workshop.id) || null,
}) : null);

export const aggregateWorkshopPriceLevelData = priceLevels => (priceItem) => {
  const priceLevelId = priceItem.price_level;
  if (priceLevels) {
    const priceLevel = priceLevels.find(priceLevelItem => priceLevelItem.id === priceLevelId);
    if (priceLevel) {
      return {
        id: priceItem.id,
        price: priceItem.price,
        level: priceLevel.name,
        takesEffectOn: priceLevel.takesEffectOn,
        endsOn: priceLevel.endsOn,
      };
    }
  }
  return null;
};

export const transformWorkshopPriceData = (workshop, priceLevels) => (workshop ? ({
  ...workshop,
  prices: workshop.prices && priceLevels ?
    workshop.prices
      .map(aggregateWorkshopPriceLevelData(priceLevels))
      .filter(item => item) : [],
}) : null);

const getLectorsAndRoles = getData({
  lectors: getLectorListState,
  roles: getLectorRolesState,
});

const workshopTransformations = [
  {
    select: getLectorsAndRoles,
    transform: transformLectorRoles,
  },
  {
    select: getDifficultyList,
    transform: transformWorkshopDifficultyName,
  },
  {
    select: getPriceLevels,
    transform: transformWorkshopPriceData,
  },
  {
    select: getWorkshopCapacity,
    transform: (workshop, capacityData) => (workshop ? ({
      ...workshop,
      capacityStatus: aggregateCapacityData(workshop.id, capacityData) || {},
    }) : null),
  },
];

export const workshopsDetail = transformData(getWorkshopDetailState, workshopTransformations);

export const getWorkshopList = transformData(getWorkshopListState, workshopTransformations);

export const getArchivedYearWorkshops = transformData(
  state => state.years.archive.workshops,
  workshopTransformations
);
