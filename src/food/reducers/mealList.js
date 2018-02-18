import {
  combine,
  fetchError,
  fetchStart,
  fetchSuccess,
} from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [constants.MEALS_FETCH_STARTED]: fetchStart,
  [constants.MEALS_FETCH_SUCCESS]: fetchSuccess,
  [constants.MEALS_FETCH_ERROR]: fetchError,
});
