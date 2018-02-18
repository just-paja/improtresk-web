import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: {},
  loading: false,
};

export default combine(defaultState, {
  [constants.YEAR_CONDITIONS_FETCH_STARTED]: fetchStart,
  [constants.YEAR_CONDITIONS_FETCH_SUCCESS]: fetchSuccess,
  [constants.YEAR_CONDITIONS_FETCH_ERROR]: fetchError,
});
