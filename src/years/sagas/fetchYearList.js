import { call, takeLatest } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../sagas/api'
import { isYearListRequired } from '../selectors'

import {
  YEARS_FETCH_STARTED,
  YEARS_FETCH_SUCCESS,
  YEARS_FETCH_ERROR,
  YEARS_REQUIRED
} from '../constants'

import * as api from '../../api'

export function * fetchYearList () {
  yield call(
    fetchResourceIfRequired,
    api.fetchYears,
    {
      isRequired: isYearListRequired,
      actions: {
        start: YEARS_FETCH_STARTED,
        success: YEARS_FETCH_SUCCESS,
        fail: YEARS_FETCH_ERROR
      }
    }
  )
}

export function * requireYearList () {
  yield takeLatest(YEARS_REQUIRED, fetchYearList)
}

export default [
  requireYearList
]
