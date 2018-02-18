import { combine } from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: null,
  loading: false,
};

export default combine(defaultState, {
  [constants.ORDER_CREATED]: (state, action) => ({
    ...state,
    data: action.data,
  }),
});
