import { combined, fetchStart, fetchError, fetchSuccess, invalidate } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.ORDER_CREATED]: invalidate,
  [constants.PARTICIPANT_ORDERS_FETCH_STARTED]: fetchStart,
  [constants.PARTICIPANT_ORDERS_FETCH_SUCCESS]: fetchSuccess,
  [constants.PARTICIPANT_ORDERS_FETCH_ERROR]: fetchError,
});
