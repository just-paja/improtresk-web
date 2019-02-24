import { createSelector } from 'reselect'
import { getData, getProgress, isRequired } from 'react-saga-rest'

import { getGeocodeState } from './geocode'

export const getLocationsState = state => state.locations.list

export const getLocationList = getData(getLocationsState)
export const getLocationListProgress = getProgress(getLocationsState)
export const isLocationListRequired = isRequired(getLocationsState)

export const getAddresses = createSelector(
  [getLocationList],
  locations => locations.map(location => location.address)
)

export const getLocationMarkers = createSelector(
  [getLocationList, getGeocodeState],
  (locations, geocode) => locations
    .filter(location => geocode[location.address] && geocode[location.address].valid)
    .map(location => ({
      ...location,
      ...geocode[location.address].data
    }))
)
