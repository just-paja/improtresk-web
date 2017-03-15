import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: null,
  loading: false,
};

export default combined(defaultState, {
  [constants.ORDER_FETCH_STARTED]: fetchStart,
  [constants.ORDER_FETCH_SUCCESS]: fetchSuccess,
  [constants.ORDER_FETCH_ERROR]: fetchError,
  [constants.ORDER_CREATED]: (state, action) => ({
    ...state,
    data: action.data,
  }),
});
