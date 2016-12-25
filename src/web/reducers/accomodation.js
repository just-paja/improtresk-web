import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.ACCOMODATION_FETCH_STARTED]: fetchStart,
  [constants.ACCOMODATION_FETCH_SUCCESS]: fetchSuccess,
  [constants.ACCOMODATION_FETCH_ERROR]: fetchError,
});
