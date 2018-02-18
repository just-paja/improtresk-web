import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [constants.LECTORS_FETCH_STARTED]: fetchStart,
  [constants.LECTORS_FETCH_SUCCESS]: fetchSuccess,
  [constants.LECTORS_FETCH_ERROR]: fetchError,
});
