import { combined } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  apiSource: '',
  data: {},
};

export default combined(defaultState, {
  [constants.PARTICIPANT_LOGIN]: (state, action) => ({
    ...state,
    data: action.data,
  }),
});
