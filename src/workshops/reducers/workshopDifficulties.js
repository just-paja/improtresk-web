import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [constants.WORKSHOP_DIFFICULTIES_FETCH_STARTED]: fetchStart,
  [constants.WORKSHOP_DIFFICULTIES_FETCH_SUCCESS]: fetchSuccess,
  [constants.WORKSHOP_DIFFICULTIES_FETCH_ERROR]: fetchError,
});
