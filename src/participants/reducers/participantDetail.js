import { combine, invalidate, fetchSuccess } from 'react-saga-rest';

import createFetchReducers from '../../reducers/createFetchReducers';

import * as constants from '../constants';

import {
  identityEdit,
  login,
  loginWithSignupData,
  participantEdit,
  participantFetch,
  signup,
} from '../actions';

const defaultState = {
  data: null,
  loading: false,
  valid: false,
};

export default combine(defaultState, {
  ...createFetchReducers({ routine: participantFetch }),
  [constants.PARTICIPANT_REGISTERED]: (state, action) => ({
    ...state,
    data: action.data,
    loading: false,
    ready: true,
    valid: true,
  }),
  [constants.PARTICIPANT_LOGOUT]: state => ({
    ...state,
    data: null,
    ready: false,
    valid: true,
  }),
  [participantEdit.SUCCESS]: fetchSuccess,
  [identityEdit.SUCCESS]: fetchSuccess,
  [loginWithSignupData.SUCCESS]: invalidate,
  [login.SUCCESS]: invalidate,
  [signup.SUCCESS]: fetchSuccess,
});
