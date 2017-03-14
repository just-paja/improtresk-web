import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.PERFORMERS_FETCH_STARTED]: fetchStart,
  [constants.PERFORMERS_FETCH_SUCCESS]: fetchSuccess,
  [constants.PERFORMERS_FETCH_ERROR]: fetchError,
});
