import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.WORKSHOP_LOCATIONS_FETCH_STARTED]: fetchStart,
  [constants.WORKSHOP_LOCATIONS_FETCH_SUCCESS]: fetchSuccess,
  [constants.WORKSHOP_LOCATIONS_FETCH_ERROR]: fetchError,
});
