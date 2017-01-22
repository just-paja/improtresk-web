import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  current: null,
  data: null,
  loading: false,
};

export default combined(defaultState, {
  [constants.ARCHIVED_YEAR_MOUNTED]: (state, action) => ({
    ...state,
    current: action.year,
  }),
  [constants.ARCHIVED_YEAR_FETCH_STARTED]: fetchStart,
  [constants.ARCHIVED_YEAR_FETCH_SUCCESS]: fetchSuccess,
  [constants.ARCHIVED_YEAR_FETCH_ERROR]: fetchError,
});
