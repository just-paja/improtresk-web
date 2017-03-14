import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: {},
  loading: false,
  polling: false,
};

export default combined(defaultState, {
  [constants.YEAR_CAPACITY_FETCH_STARTED]: fetchStart,
  [constants.YEAR_CAPACITY_FETCH_SUCCESS]: fetchSuccess,
  [constants.YEAR_CAPACITY_FETCH_ERROR]: fetchError,
  [constants.YEAR_CAPACITY_POLL_START]: state => ({
    ...state,
    polling: true,
  }),
  [constants.YEAR_CAPACITY_POLL_STOP]: state => ({
    ...state,
    polling: false,
  }),
});
