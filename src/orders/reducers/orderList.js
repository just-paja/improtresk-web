import {
  combine,
  fetchStart,
  fetchError,
  fetchSuccess,
  invalidate,
} from 'react-saga-rest';

import {
  ORDERS_FETCH_ERROR,
  ORDERS_FETCH_STARTED,
  ORDERS_FETCH_SUCCESS,
  ORDER_CANCEL_FETCH_SUCCESS,
  ORDER_CONFIRM_FETCH_SUCCESS,
  ORDERS_INVALIDATE,
  ORDER_CHANGED,
  ORDER_CREATED,
} from '../constants';
import { PARTICIPANT_LOGOUT } from '../../participants/constants';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  [ORDERS_FETCH_ERROR]: fetchError,
  [ORDERS_FETCH_STARTED]: fetchStart,
  [ORDERS_FETCH_SUCCESS]: fetchSuccess,
  [ORDER_CANCEL_FETCH_SUCCESS]: invalidate,
  [ORDER_CONFIRM_FETCH_SUCCESS]: invalidate,
  [ORDERS_INVALIDATE]: invalidate,
  [ORDER_CHANGED]: invalidate,
  [ORDER_CREATED]: invalidate,
  [PARTICIPANT_LOGOUT]: invalidate,
});
