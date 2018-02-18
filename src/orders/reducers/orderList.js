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
  ORDER_CANCELED,
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
  [ORDER_CANCELED]: invalidate,
  [ORDER_CHANGED]: invalidate,
  [ORDER_CREATED]: invalidate,
  [PARTICIPANT_LOGOUT]: invalidate,
});
