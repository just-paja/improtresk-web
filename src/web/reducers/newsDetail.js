import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: null,
  id: null,
  loading: false,
};

export default combined(defaultState, {
  [constants.NEWS_DETAIL_MOUNTED]: (state, action) => ({
    ...state,
    id: action.news,
  }),
  [constants.NEWS_DETAIL_FETCH_STARTED]: fetchStart,
  [constants.NEWS_DETAIL_FETCH_SUCCESS]: fetchSuccess,
  [constants.NEWS_DETAIL_FETCH_ERROR]: fetchError,
});
