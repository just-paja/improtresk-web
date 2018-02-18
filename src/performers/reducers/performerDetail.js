import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
} from 'react-saga-rest';

import {
  PERFORMER_DETAIL_FETCH_ERROR,
  PERFORMER_DETAIL_FETCH_STARTED,
  PERFORMER_DETAIL_FETCH_SUCCESS,
  PERFORMER_DETAIL_REQUIRED,
} from '../constants';

const defaultState = {
  data: null,
  id: null,
  loading: false,
};

export default combine(defaultState, {
  [PERFORMER_DETAIL_REQUIRED]: (state, action) => ({
    ...state,
    id: action.performer,
  }),
  [PERFORMER_DETAIL_FETCH_STARTED]: fetchStart,
  [PERFORMER_DETAIL_FETCH_SUCCESS]: fetchSuccess,
  [PERFORMER_DETAIL_FETCH_ERROR]: fetchError,
});
