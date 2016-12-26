import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.FOOD_TIMES_FETCH_STARTED]: fetchStart,
  [constants.FOOD_TIMES_FETCH_SUCCESS]: fetchSuccess,
  [constants.FOOD_TIMES_FETCH_ERROR]: fetchError,
});
