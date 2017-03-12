import { combined } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  apiSource: '',
  autoLoginAttempted: false,
  data: {},
};

export default combined(defaultState, {
  [constants.PARTICIPANT_LOGIN_AUTO]: state => ({
    ...state,
    autoLoginAttempted: true,
  }),
  [constants.PARTICIPANT_LOGIN]: (state, action) => ({
    ...state,
    data: action.data,
  }),
});
