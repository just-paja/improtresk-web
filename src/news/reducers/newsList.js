import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
} from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [constants.NEWS_FETCH_STARTED]: fetchStart,
  [constants.NEWS_FETCH_SUCCESS]: fetchSuccess,
  [constants.NEWS_FETCH_ERROR]: fetchError,
});
