import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.YEARS_FETCH_STARTED]: fetchStart,
  [constants.YEARS_FETCH_SUCCESS]: fetchSuccess,
  [constants.YEARS_FETCH_ERROR]: fetchError,
});
