import { call, fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { isStateValid } from '../selectors/common';
import {
  getAllAddresses,
  getGeocodeState,
} from '../selectors/geocode';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchMarker(address) {
  yield fork(
    fetchResourceIfNeeded,
    api.fetchMarker,
    isStateValid,
    {
      onStart: 'GEOCODE_LOCATION_FETCH_STARTED',
      onSuccess: 'GEOCODE_LOCATION_FETCH_SUCCESS',
      onError: 'GEOCODE_LOCATION_FETCH_ERROR',
      address,
    }
  );
}

export function* fetchAllMarkers() {
  const markers = yield select(getAllAddresses);
  const locations = yield select(getGeocodeState);

  yield markers
    .filter(address => !isStateValid(locations[address]))
    .map(address => call(fetchMarker, address));
}

export function* geocodeAll() {
  yield takeLatest(
    [
      constants.WORKSHOP_LOCATIONS_FETCH_SUCCESS,
      constants.REQUEST_WORKSHOP_LOCATIONS,
    ],
    fetchAllMarkers
  );
}

export default [
  geocodeAll,
];
