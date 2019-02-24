import { all, call, select, takeEvery } from 'redux-saga/effects'

import { fetchResource } from '../../sagas/api'
import {
  getAllAddresses,
  getGeocodeState
} from '../selectors'

import * as api from '../../api'
import * as constants from '../constants'

const isRequired = state => !state || (!state.valid && !state.loading)

function * fetchMarker (address) {
  yield call(fetchResource, api.fetchMarker, {
    actions: {
      start: 'GEOCODE_LOCATION_FETCH_STARTED',
      success: 'GEOCODE_LOCATION_FETCH_SUCCESS',
      fail: 'GEOCODE_LOCATION_FETCH_ERROR'
    },
    params: { address },
    actionData: { address }
  })
}

function * fetchAllMarkers () {
  const markers = yield select(getAllAddresses)
  const locations = yield select(getGeocodeState)

  yield all(markers
    .filter(address => isRequired(locations[address]))
    .map(address => call(fetchMarker, address)))
}

function * requireGeocode () {
  yield takeEvery([
    constants.LOCATIONS_FETCH_SUCCESS,
    constants.LOCATIONS_REQUIRED
  ], fetchAllMarkers)
}

export default [
  requireGeocode
]
