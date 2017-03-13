import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.TEAMS_FETCH_STARTED]: fetchStart,
  [constants.TEAMS_FETCH_SUCCESS]: fetchSuccess,
  [constants.TEAMS_FETCH_ERROR]: fetchError,
});
