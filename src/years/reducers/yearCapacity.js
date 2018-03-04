import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: {},
  loading: false,
  polling: false,
};

export default combine(defaultState, {
  [constants.YEAR_CAPACITY_FETCH_STARTED]: fetchStart,
  [constants.YEAR_CAPACITY_FETCH_SUCCESS]: fetchSuccess,
  [constants.YEAR_CAPACITY_UPDATE_SUCCESS]: fetchSuccess,
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
