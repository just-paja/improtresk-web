import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  getAllAddresses,
} from '../selectors/geocode';

import * as api from '../api';
import * as constants from '../constants/actions';

function* fetchMarker(address) {
  yield put({
    type: constants.GEOCODE_LOCATION_FETCH_STARTED,
    address,
  });

  try {
    const res = yield call(api.fetchMarker, {
      address,
    });
    const data = yield res.json();
    yield put({
      type: constants.GEOCODE_LOCATION_FETCH_SUCCESS,
      address,
      data: data.results[0].geometry.location,
    });
  } catch (error) {
    yield put({
      type: constants.GEOCODE_LOCATION_FETCH_ERROR,
      address,
      error,
    });
  }
}

export function* fetchAllMarkers() {
  const markers = yield select(getAllAddresses);
  yield markers.map(address => call(fetchMarker, address));
}

export function* geocodeAll() {
  yield takeLatest(
    constants.WORKSHOP_LOCATIONS_FETCH_SUCCESS,
    fetchAllMarkers
  );
}

export default [
  geocodeAll,
];
