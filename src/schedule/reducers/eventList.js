import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
} from 'react-saga-rest';

import {
  SCHEDULE_EVENTS_FETCH_ERROR,
  SCHEDULE_EVENTS_FETCH_STARTED,
  SCHEDULE_EVENTS_FETCH_SUCCESS,
} from '../constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [SCHEDULE_EVENTS_FETCH_ERROR]: fetchError,
  [SCHEDULE_EVENTS_FETCH_STARTED]: fetchStart,
  [SCHEDULE_EVENTS_FETCH_SUCCESS]: fetchSuccess,
});
