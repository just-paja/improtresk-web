import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.LECTORS_FETCH_STARTED]: fetchStart,
  [constants.LECTORS_FETCH_SUCCESS]: fetchSuccess,
  [constants.LECTORS_FETCH_ERROR]: fetchError,
});
