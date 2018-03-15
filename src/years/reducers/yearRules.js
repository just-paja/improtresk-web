import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: {},
  loading: false,
};

export default combine(defaultState, {
  [constants.YEAR_RULES_FETCH_START]: fetchStart,
  [constants.YEAR_RULES_FETCH_SUCCESS]: fetchSuccess,
  [constants.YEAR_RULES_FETCH_ERROR]: fetchError,
});
