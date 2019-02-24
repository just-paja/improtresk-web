import cookie from 'js-cookie'

import { call, put, select, takeEvery } from 'redux-saga/effects'

import { fetchResource } from '../../sagas/api'
import { getApiAuth } from '../../selectors/session'
import { getParticipantDetailState } from '../selectors'
import { redirectSignup } from '../../sagas/redirects'
import { participantFetch, login, loginWithSignupData } from '../actions'

import createFetchSaga from '../../sagas/createFetchSaga'

import * as api from '../../api'
import * as constants from '../constants'

function * triggerParticipantFetch () {
  yield put(participantFetch())
}

export function * requireParticipant () {
  yield takeEvery(
    [
      login.SUCCESS,
      loginWithSignupData.SUCCESS,
      constants.PARTICIPANT_LOGIN_AUTO_SUCCESS
    ],
    triggerParticipantFetch
  )
}

export function * logout () {
  const auth = yield select(getApiAuth)
  if (auth.access_token) {
    yield call(fetchResource, api.logout, {
      actions: {
        start: constants.PARTICIPANT_TOKEN_REVOKE_START,
        success: constants.PARTICIPANT_TOKEN_REVOKE_SUCCESS,
        fail: constants.PARTICIPANT_TOKEN_REVOKE_ERROR
      }
    })
  }
  cookie.set('auth', null)
}

function * afterLogout () {
  yield takeEvery(
    constants.PARTICIPANT_TOKEN_REVOKE_SUCCESS,
    redirectSignup
  )
}

export function * logoutOnAction () {
  yield takeEvery(
    constants.PARTICIPANT_LOGOUT,
    logout
  )
}

export default [
  ...createFetchSaga(participantFetch, {
    stateSelector: getParticipantDetailState
  }),
  requireParticipant,
  afterLogout,
  logoutOnAction
]
