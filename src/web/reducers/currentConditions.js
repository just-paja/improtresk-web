import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: {},
  loading: false,
};

export default combined(defaultState, {
  [constants.CONDITIONS_CURRENT_FETCH_STARTED]: fetchStart,
  [constants.CONDITIONS_CURRENT_FETCH_SUCCESS]: fetchSuccess,
  [constants.CONDITIONS_CURRENT_FETCH_ERROR]: fetchError,
});
