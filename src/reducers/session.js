import { combine } from 'react-saga-rest';

import * as actions from '../constants';
import {
  PARTICIPANT_LOGIN,
  PARTICIPANT_LOGIN_AUTO,
  PARTICIPANT_LOGIN_AUTO_SUCCESS,
  PARTICIPANT_TOKEN_REVOKE_START,
} from '../participants/constants';

const defaultState = {
  apiSource: '',
  autoLoginAttempted: false,
  locale: null,
  data: {},
};

export default combine(defaultState, {
  [PARTICIPANT_LOGIN_AUTO]: state => ({
    ...state,
    autoLoginAttempted: true,
  }),
  [PARTICIPANT_LOGIN]: (state, action) => ({
    ...state,
    data: action.data,
  }),
  [PARTICIPANT_LOGIN_AUTO_SUCCESS]: (state, action) => ({
    ...state,
    data: action.data,
    autoLoginAttempted: true,
  }),
  [PARTICIPANT_TOKEN_REVOKE_START]: state => ({
    ...state,
    data: {},
  }),
  [actions.MAGIC_DOOR_TOKEN]: state => ({
    ...state,
    forceOpenSignups: true,
  }),
  [actions.SESSION_SET_LANGUAGE]: (state, action) => ({
    ...state,
    locale: action.language,
  }),
});
