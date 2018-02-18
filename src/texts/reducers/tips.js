import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [constants.TIPS_FETCH_STARTED]: fetchStart,
  [constants.TIPS_FETCH_SUCCESS]: fetchSuccess,
  [constants.TIPS_FETCH_ERROR]: fetchError,
});
