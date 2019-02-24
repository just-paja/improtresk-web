import { takeLatest } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../sagas/api'
import { isTeamListRequired } from '../selectors'

import * as api from '../../api'
import * as constants from '../constants'

export function * fetchTeamsOnMount () {
  yield takeLatest(
    constants.TEAMS_REQUIRED,
    fetchResourceIfRequired,
    api.fetchTeams,
    {
      isRequired: isTeamListRequired,
      actions: {
        start: constants.TEAMS_FETCH_STARTED,
        success: constants.TEAMS_FETCH_SUCCESS,
        fail: constants.TEAMS_FETCH_ERROR
      }
    }
  )
}

export default [
  fetchTeamsOnMount
]
