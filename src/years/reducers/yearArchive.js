import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
  invalidateOnResourceChange,
} from 'react-saga-rest';

import {
  YEAR_DETAIL_REQUIRED,
  YEAR_DETAIL_FETCH_STARTED,
  YEAR_DETAIL_FETCH_SUCCESS,
  YEAR_DETAIL_FETCH_ERROR,
} from '../constants';

const defaultState = {
  current: null,
  data: null,
  loading: false,
};

export default combine(defaultState, {
  [YEAR_DETAIL_REQUIRED]: invalidateOnResourceChange('current', 'year'),
  [YEAR_DETAIL_FETCH_STARTED]: fetchStart,
  [YEAR_DETAIL_FETCH_SUCCESS]: fetchSuccess,
  [YEAR_DETAIL_FETCH_ERROR]: fetchError,
});
