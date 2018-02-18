import { createSelector } from 'reselect';
import { isRequired, getData, getProp } from 'react-saga-rest';

import { aggregateLectorsData, getLectorRoles, getLectors } from './lectors';
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
  getLectors,
  getLectorRoles,
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

export const aggregateWorkshopDifficultyName = (id, difficulties) => {
  if (difficulties) {
    const difficulty = difficulties.find(record => record.id === id);
    return difficulty ? difficulty.name : null;
  }
  return null;
};

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

export const aggregateWorkshopPriceData = (prices, priceLevels) => (
  prices && priceLevels ?
    prices
      .map(aggregateWorkshopPriceLevelData(priceLevels))
      .filter(item => item) : []
);

export const aggregateWorkshopData = (
  lectors,
  roles,
  difficulties,
  priceLevels,
  capacity
) => workshop => (
  workshop ? ({
    ...workshop,
    capacityStatus: aggregateCapacityData(workshop.id, capacity) || {},
    difficulty: aggregateWorkshopDifficultyName(workshop.difficulty, difficulties),
    lectors: aggregateLectorsData(workshop.lectors, lectors, roles),
    prices: aggregateWorkshopPriceData(workshop.prices, priceLevels),
  }) : null
);


export const workshopsDetail = createSelector(
  [getWorkshopDetailState, ...getWorkshopRelatedData()],
  (detail, lectors, roles, difficulties, priceLevels, capacity) =>
    aggregateWorkshopData(lectors, roles, difficulties, priceLevels, capacity)(detail.data)
);

export const getWorkshopList = createSelector(
  [getWorkshopListState, ...getWorkshopRelatedData()],
  (workshops, lectors, roles, difficulties, priceLevels, capacity) =>
    workshops.data.map(
      aggregateWorkshopData(lectors, roles, difficulties, priceLevels, capacity)
    )
);
export const workshopsAll = getWorkshopList;

export const getArchivedYearWorkshops = createSelector(
  [state => state.years.archive, ...getWorkshopRelatedData()],
  (current, lectors, roles, difficulties, priceLevels) => (current ? (
    current.workshops.map(aggregateWorkshopData(lectors, roles, difficulties, priceLevels))
  ) : [])
);
