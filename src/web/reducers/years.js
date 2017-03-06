import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
  forceOpen: false,
};

export default combined(defaultState, {
  [constants.SIGNUPS_OPEN]: state => ({
    ...state,
    forceOpen: true,
  }),
  [constants.YEARS_FETCH_STARTED]: fetchStart,
  [constants.YEARS_FETCH_SUCCESS]: fetchSuccess,
  [constants.YEARS_FETCH_ERROR]: fetchError,
});
