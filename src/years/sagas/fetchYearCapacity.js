import { call, put, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga/lib'
import { canUseDOM } from 'exenv'

import { fetchResource } from '../../sagas/api'
import { isPolling } from '../selectors/yearCapacity'
import { yearActiveNumber } from '../selectors'

import * as api from '../../api'
import * as constants from '../constants'

const DELAY_TIME = 8000

function * fetchCapacity () {
  const year = yield select(yearActiveNumber)
  if (year) {
    yield call(fetchResource, api.fetchCapacity, {
      actions: {
        start: constants.YEAR_CAPACITY_FETCH_STARTED,
        success: constants.YEAR_CAPACITY_FETCH_SUCCESS,
        fail: constants.YEAR_CAPACITY_FETCH_ERROR
      },
      params: { year }
    })
  }
}

function * pollCapacity () {
  const year = yield select(yearActiveNumber)
  if (year) {
    yield call(fetchResource, api.fetchCapacity, {
      actions: {
        start: constants.YEAR_CAPACITY_UPDATE_STARTED,
        success: constants.YEAR_CAPACITY_UPDATE_SUCCESS,
        fail: constants.YEAR_CAPACITY_UPDATE_ERROR
      },
      params: { year }
    })
    yield call(delay, DELAY_TIME)
    const polling = yield select(isPolling)
    if (polling) {
      yield put({ type: constants.YEAR_CAPACITY_POLL_CYCLE_FINISHED })
    }
  }
}

function * fetchAndPollCapacityStart () {
  yield put({ type: constants.YEAR_CAPACITY_POLL_START })
  yield call(fetchCapacity)
  yield call(delay, DELAY_TIME)
  const polling = yield select(isPolling)
  if (polling && canUseDOM) {
    yield call(pollCapacity)
  }
}

function * pollCapacityStop () {
  yield put({ type: constants.YEAR_CAPACITY_POLL_STOP })
}

function * requireCapacity () {
  yield takeLatest(
    constants.YEAR_CAPACITY_REQUIRED,
    fetchCapacity
  )
}

function * requirePollCapacity () {
  yield takeLatest(
    constants.YEAR_CAPACITY_POLL_CYCLE_FINISHED,
    pollCapacity
  )
}

function * requirePollCapacityStart () {
  yield takeLatest(
    constants.YEAR_CAPACITY_POLL_REQUIRED,
    fetchAndPollCapacityStart
  )
}

function * requirePollCapacityStop () {
  yield takeLatest(
    constants.YEAR_CAPACITY_POLL_STOP_REQUIRED,
    pollCapacityStop
  )
}

export default [
  requireCapacity,
  requirePollCapacity,
  requirePollCapacityStart,
  requirePollCapacityStop
]
