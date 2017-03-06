import { combined } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: null,
};

export default combined(defaultState, {
  [constants.SIGNUP_REGISTERED]: (state, action) => ({
    ...state,
    data: action.data,
  }),
});
