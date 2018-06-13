import {
  combine,
  fetchFailure,
  fetchStart,
  fetchStop,
  fetchSuccess,
  invalidateOnResourceChange,
} from 'react-saga-rest';

import { yearDetailFetch } from '../actions';

const defaultState = {
  current: null,
  data: null,
  loading: false,
};

export default combine(defaultState, {
  [yearDetailFetch.FAILURE]: fetchFailure,
  [yearDetailFetch.FULFILL]: fetchStop,
  [yearDetailFetch.REQUEST]: fetchStart,
  [yearDetailFetch.SUCCESS]: fetchSuccess,
  [yearDetailFetch.TRIGGER]: invalidateOnResourceChange('current', 'payload'),
});
