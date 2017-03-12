import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
};

export default combined(defaultState, {
  [constants.PARTICIPANT_ORDERS_FETCH_STARTED]: fetchStart,
  [constants.PARTICIPANT_ORDERS_FETCH_SUCCESS]: fetchSuccess,
  [constants.PARTICIPANT_ORDERS_FETCH_ERROR]: fetchError,
});
