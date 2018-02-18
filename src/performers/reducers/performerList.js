import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
} from 'react-saga-rest';

import {
  PERFORMERS_FETCH_ERROR,
  PERFORMERS_FETCH_STARTED,
  PERFORMERS_FETCH_SUCCESS,
} from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [PERFORMERS_FETCH_STARTED]: fetchStart,
  [PERFORMERS_FETCH_SUCCESS]: fetchSuccess,
  [PERFORMERS_FETCH_ERROR]: fetchError,
});
