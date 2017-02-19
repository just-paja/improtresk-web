import { createSelector } from 'reselect';

const getGeocodeState = state => state.geocode;

export const getAllAddresses = createSelector(
  [getGeocodeState],
  state => Object.keys(state)
);

export const isReady = createSelector(
  [getGeocodeState],
  geocode => Object.keys(geocode).every(location => !!geocode[location].ready)
);

export default { getAllAddresses };
