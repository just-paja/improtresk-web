import {
  combine,
  fetchError,
  fetchStart,
  fetchSuccess,
} from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: null,
  loading: false,
};

export default combine(defaultState, {
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
    valid: false,
  }),
  [constants.PARTICIPANT_FETCH_STARTED]: fetchStart,
  [constants.PARTICIPANT_FETCH_SUCCESS]: fetchSuccess,
  [constants.PARTICIPANT_FETCH_ERROR]: fetchError,
});
