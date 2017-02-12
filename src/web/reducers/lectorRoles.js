import { combined, fetchStart, fetchError, fetchSuccess } from './common';

import * as constants from '../constants/actions';

const defaultState = {
  data: [],
  loading: false,
};

export default combined(defaultState, {
  [constants.LECTOR_ROLES_FETCH_STARTED]: fetchStart,
  [constants.LECTOR_ROLES_FETCH_SUCCESS]: fetchSuccess,
  [constants.LECTOR_ROLES_FETCH_ERROR]: fetchError,
});
