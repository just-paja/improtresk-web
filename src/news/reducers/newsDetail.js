import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
  invalidate,
} from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: null,
  id: null,
  loading: false,
};

export default combine(defaultState, {
  [constants.NEWS_DETAIL_REQUIRED]: (state, action) => ({
    ...state,
    id: action.news,
  }),
  [constants.NEWS_DETAIL_FETCH_STARTED]: fetchStart,
  [constants.NEWS_DETAIL_FETCH_SUCCESS]: fetchSuccess,
  [constants.NEWS_DETAIL_FETCH_ERROR]: fetchError,
  [constants.NEWS_DETAIL_INVALIDATE]: invalidate,
});
