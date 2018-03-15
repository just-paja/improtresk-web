import { createSelector } from 'reselect';

export const getGeocodeState = state => state.locations.geocode;

export const getAllAddresses = createSelector(
  [getGeocodeState],
  state => Object.keys(state)
);

export const isReady = createSelector(
  [getGeocodeState],
  geocode => Object
    .keys(geocode)
    .every(location => !!(geocode[location] && geocode[location].ready))
);
