import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.NEWS_FETCH_STARTED]: fetchStart,
  [constants.NEWS_FETCH_SUCCESS]: fetchSuccess,
  [constants.NEWS_FETCH_ERROR]: fetchError,
});
