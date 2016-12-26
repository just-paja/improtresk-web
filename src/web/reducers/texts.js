import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {};

const defaultTextState = {
  data: {},
  loading: false,
};

export default combined(defaultState, {
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
