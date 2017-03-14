import { combined, fetchStart, fetchError } from './common';

import * as constants from '../constants/actions';

const defaultState = {};

export default combined(defaultState, {
  [constants.WORKSHOP_LOCATIONS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    ...action.data.reduce((locations, location) => ({
      ...locations,
      [location.address]: { data: null },
    }), {}),
  }),
  [constants.GEOCODE_LOCATION_FETCH_STARTED]: (state, action) => ({
    ...state,
    [action.address]: fetchStart(state[action.address], action),
  }),
  [constants.GEOCODE_LOCATION_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.address]: {
      ...state[action.address],
      loading: false,
      ready: true,
      valid: true,
      data:
        action.data &&
        action.data.results &&
        action.data.results[0] ?
          action.data.results[0].geometry.location : null,
    },
  }),
  [constants.GEOCODE_LOCATION_FETCH_ERROR]: (state, action) => ({
    ...state,
    [action.address]: fetchError(state[action.address], action),
  }),
});
