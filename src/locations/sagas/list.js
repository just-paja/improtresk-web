import { call, select, takeEvery } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../sagas/api'
import { isLocationListRequired } from '../selectors'
import { yearActiveNumber } from '../../years/selectors'

import * as api from '../../api'
import * as constants from '../constants'

function * fetchLocations () {
  const year = yield select(yearActiveNumber)
  if (year) {
    yield call(
      fetchResourceIfRequired,
      api.fetchLocations,
      {
        isRequired: isLocationListRequired,
        actions: {
          start: constants.LOCATIONS_FETCH_STARTED,
          success: constants.LOCATIONS_FETCH_SUCCESS,
          fail: constants.LOCATIONS_FETCH_ERROR
        },
        params: { year }
      }
    )
  }
}

function * requireLocations () {
  yield takeEvery(
    constants.LOCATIONS_REQUIRED,
    fetchLocations
  )
}

export default [
  requireLocations
]
