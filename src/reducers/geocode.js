import { combine, fetchStart, fetchError } from 'react-saga-rest';

import * as constants from '../constants';
import { WORKSHOP_LOCATIONS_FETCH_SUCCESS } from '../workshops/constants';

const defaultState = {};

export default combine(defaultState, {
  [WORKSHOP_LOCATIONS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    ...action.data.reduce((locations, location) => ({
      ...locations,
      [location.address]: { data: null },
    }), {}),
  }),
  [constants.GEOCODE_LOCATIONS_RESET]: (state, action) => ({
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
