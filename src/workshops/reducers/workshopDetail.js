import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
  invalidateOnResourceChange,
} from 'react-saga-rest';

import * as constants from '../constants';

const defaultState = {
  data: null,
  id: null,
  loading: false,
};

export default combine(defaultState, {
  [constants.WORKSHOP_DETAIL_REQUIRED]: invalidateOnResourceChange('id', 'workshop'),
  [constants.WORKSHOP_DETAIL_FETCH_STARTED]: fetchStart,
  [constants.WORKSHOP_DETAIL_FETCH_SUCCESS]: fetchSuccess,
  [constants.WORKSHOP_DETAIL_FETCH_ERROR]: fetchError,
});
