import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.TIPS_FETCH_STARTED]: fetchStart,
  [constants.TIPS_FETCH_SUCCESS]: fetchSuccess,
  [constants.TIPS_FETCH_ERROR]: fetchError,
});
