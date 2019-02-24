import { call, put, select, takeEvery } from 'redux-saga/effects'

import { requireCapacityPoll, stopCapacityPoll } from '../../years/actions'
import { fetchResourceIfRequired } from '../../sagas/api'
import { getWorkshopDetailId, isWorkshopDetailRequired } from '../selectors'
import { yearActiveNumber } from '../../years/selectors'

import * as api from '../../api'
import * as constants from '../constants'

function * fetchWorkshopDetail () {
  const year = yield select(yearActiveNumber)
  const workshop = yield select(getWorkshopDetailId)
  if (year && workshop) {
    yield put(requireCapacityPoll())
    yield call(
      fetchResourceIfRequired,
      api.fetchWorkshopDetail,
      {
        isRequired: isWorkshopDetailRequired,
        actions: {
          start: constants.WORKSHOP_DETAIL_FETCH_STARTED,
          success: constants.WORKSHOP_DETAIL_FETCH_SUCCESS,
          fail: constants.WORKSHOP_DETAIL_FETCH_ERROR
        },
        params: {
          year,
          workshop
        }
      }
    )
  }
}

function * stopPolling () {
  yield put(stopCapacityPoll())
}

function * onWorkshopDetailRequire () {
  yield takeEvery(
    constants.WORKSHOP_DETAIL_REQUIRED,
    fetchWorkshopDetail
  )
}

function * onWorkshopDetailExit () {
  yield takeEvery(constants.WORKSHOP_DETAIL_LEFT, stopPolling)
}

export default [
  onWorkshopDetailExit,
  onWorkshopDetailRequire
]
