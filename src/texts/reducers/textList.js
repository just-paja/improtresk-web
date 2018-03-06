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
    [action.category]: fetchStart(state[action.category] || defaultTextState),
  }),
  [constants.TEXT_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.category]: fetchSuccess(state[action.category] || defaultTextState, action),
  }),
  [constants.TEXT_FETCH_ERROR]: (state, action) => ({
    ...state,
    [action.category]: fetchError(state[action.category] || defaultTextState, action),
  }),
});
