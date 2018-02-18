import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
} from 'react-saga-rest';

import {
  YEARS_FETCH_ERROR,
  YEARS_FETCH_STARTED,
  YEARS_FETCH_SUCCESS,
} from '../constants';

import { SIGNUPS_OPEN } from '../../participants/constants';

const defaultState = {
  data: [],
  loading: false,
  forceOpen: false,
};

export default combine(defaultState, {
  [SIGNUPS_OPEN]: state => ({
    ...state,
    forceOpen: true,
  }),
  [YEARS_FETCH_STARTED]: fetchStart,
  [YEARS_FETCH_SUCCESS]: fetchSuccess,
  [YEARS_FETCH_ERROR]: fetchError,
});
