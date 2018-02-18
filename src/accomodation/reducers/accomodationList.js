import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
} from 'react-saga-rest';

import {
  ACCOMODATION_FETCH_ERROR,
  ACCOMODATION_FETCH_STARTED,
  ACCOMODATION_FETCH_SUCCESS,
} from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [ACCOMODATION_FETCH_ERROR]: fetchError,
  [ACCOMODATION_FETCH_STARTED]: fetchStart,
  [ACCOMODATION_FETCH_SUCCESS]: fetchSuccess,
});
