import { takeEvery } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../sagas/api'
import { isDifficultyListRequired } from '../selectors'

import * as api from '../../api'
import * as constants from '../constants'

function * requireWorkshopDifficultyList () {
  yield takeEvery(
    constants.WORKSHOP_DIFFICULTIES_REQUIRED,
    fetchResourceIfRequired,
    api.fetchWorkshopDifficulties,
    {
      isRequired: isDifficultyListRequired,
      actions: {
        start: constants.WORKSHOP_DIFFICULTIES_FETCH_STARTED,
        success: constants.WORKSHOP_DIFFICULTIES_FETCH_SUCCESS,
        fail: constants.WORKSHOP_DIFFICULTIES_FETCH_ERROR
      }
    }
  )
}

export default [
  requireWorkshopDifficultyList
]
