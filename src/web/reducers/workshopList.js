import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.WORKSHOPS_FETCH_STARTED]: fetchStart,
  [constants.WORKSHOPS_FETCH_SUCCESS]: fetchSuccess,
  [constants.WORKSHOPS_FETCH_ERROR]: fetchError,
});
