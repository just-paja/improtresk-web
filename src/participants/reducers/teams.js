import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
} from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [constants.TEAMS_FETCH_STARTED]: fetchStart,
  [constants.TEAMS_FETCH_SUCCESS]: fetchSuccess,
  [constants.TEAMS_FETCH_ERROR]: fetchError,
});
