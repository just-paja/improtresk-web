import { combine } from 'react-saga-rest'

import * as actions from '../constants'
import { login, loginWithSignupData } from '../participants/actions'
import {
  PARTICIPANT_LOGIN_AUTO,
  PARTICIPANT_LOGIN_AUTO_SUCCESS,
  PARTICIPANT_TOKEN_REVOKE_START
} from '../participants/constants'

const defaultState = {
  apiSource: '',
  autoLoginAttempted: false,
  locale: null,
  data: {},
  loginRedirect: null
}

export default combine(defaultState, {
  [PARTICIPANT_LOGIN_AUTO]: state => ({
    ...state,
    autoLoginAttempted: true
  }),
  [login.SUCCESS]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [loginWithSignupData.SUCCESS]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [PARTICIPANT_LOGIN_AUTO_SUCCESS]: (state, action) => ({
    ...state,
    data: action.data,
    autoLoginAttempted: true
  }),
  [PARTICIPANT_TOKEN_REVOKE_START]: state => ({
    ...state,
    data: {}
  }),
  [actions.MAGIC_DOOR_TOKEN]: state => ({
    ...state,
    forceOpenSignups: true
  }),
  [actions.SET_LOGIN_REDIRECT]: (state, action) => ({
    ...state,
    loginRedirect: action.path
  }),
  [actions.SESSION_SET_LANGUAGE]: (state, action) => ({
    ...state,
    locale: action.language
  })
})
