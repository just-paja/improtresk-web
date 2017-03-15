import { combined } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: null,
  loading: false,
};

export default combined(defaultState, {
  [constants.ORDER_CREATED]: (state, action) => ({
    ...state,
    data: action.data,
  }),
});
