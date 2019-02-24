import { put, takeLatest } from 'redux-saga/effects'

import {
  requireLectorList,
  requireLectorRoles,
  requireWorkshopDifficulties
} from '../workshops/actions'
import { requireYearList } from '../years/actions'

import * as constants from '../constants'

export function * requireInitialData () {
  yield put(requireYearList())
  yield put(requireLectorRoles())
  yield put(requireLectorList())
  yield put(requireWorkshopDifficulties())
}

export function * onAppMount () {
  yield takeLatest(constants.APP_MOUNTED, requireInitialData)
}

export default [
  onAppMount
]
