import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.SCHEDULE_EVENTS_FETCH_STARTED]: fetchStart,
  [constants.SCHEDULE_EVENTS_FETCH_SUCCESS]: fetchSuccess,
  [constants.SCHEDULE_EVENTS_FETCH_ERROR]: fetchError,
});
