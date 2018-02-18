import { all, call, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from './api';
import {
  getAllAddresses,
  getGeocodeState,
} from '../selectors/geocode';

import * as api from '../api';
import {
  WORKSHOP_LOCATIONS_FETCH_SUCCESS,
  WORKSHOP_LOCATIONS_REQUIRED,
} from '../workshops/constants';

export const isRequired = state => !state || (!state.valid && !state.loading);

export function* fetchMarker(address) {
  yield call(fetchResource, api.fetchMarker, {
    actions: {
      start: 'GEOCODE_LOCATION_FETCH_STARTED',
      success: 'GEOCODE_LOCATION_FETCH_SUCCESS',
      fail: 'GEOCODE_LOCATION_FETCH_ERROR',
    },
    params: { address },
    actionData: { address },
  });
}

export function* fetchAllMarkers() {
  const markers = yield select(getAllAddresses);
  const locations = yield select(getGeocodeState);

  yield all(markers
    .filter(address => isRequired(locations[address]))
    .map(address => call(fetchMarker, address)));
}

export function* requireGeocode() {
  yield takeLatest(
    [
      WORKSHOP_LOCATIONS_FETCH_SUCCESS,
      WORKSHOP_LOCATIONS_REQUIRED,
    ],
    fetchAllMarkers
  );
}

export default [
  requireGeocode,
];
