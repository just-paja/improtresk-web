import { takeLatest } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../../sagas/api'
import { fetchTeamsOnMount } from '..'
import { isTeamListRequired } from '../../selectors/teams'

import * as api from '../../../api'

describe('Teams sagas', () => {
  it('fetchTeamsOnMount creates fetch actions', () => {
    const saga = fetchTeamsOnMount()
    expect(saga.next().value).toEqual(takeLatest(
      'TEAMS_REQUIRED',
      fetchResourceIfRequired,
      api.fetchTeams,
      {
        isRequired: isTeamListRequired,
        actions: {
          start: 'TEAMS_FETCH_STARTED',
          success: 'TEAMS_FETCH_SUCCESS',
          fail: 'TEAMS_FETCH_ERROR'
        }
      })
    )
    expect(saga.next().done).toBe(true)
  })
})
