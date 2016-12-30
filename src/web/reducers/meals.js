import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.MEALS_FETCH_STARTED]: fetchStart,
  [constants.MEALS_FETCH_SUCCESS]: fetchSuccess,
  [constants.MEALS_FETCH_ERROR]: fetchError,
});
