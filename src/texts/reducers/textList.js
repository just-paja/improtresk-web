import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {};

const defaultTextState = {
  data: {},
  loading: false,
};

export default combine(defaultState, {
  [constants.TEXT_FETCH_STARTED]: (state, action) => ({
    ...state,
    [action.code]: fetchStart(state[action.code] || defaultTextState),
  }),
  [constants.TEXT_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.code]: fetchSuccess(state[action.code] || defaultTextState, action),
  }),
  [constants.TEXT_FETCH_ERROR]: (state, action) => ({
    ...state,
    [action.code]: fetchError(state[action.code] || defaultTextState, action),
  }),
});
