import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: null,
  loading: false,
};

export default combined(defaultState, {
  [constants.WORKSHOP_DIFFICULTIES_FETCH_STARTED]: fetchStart,
  [constants.WORKSHOP_DIFFICULTIES_FETCH_SUCCESS]: fetchSuccess,
  [constants.WORKSHOP_DIFFICULTIES_FETCH_ERROR]: fetchError,
});
