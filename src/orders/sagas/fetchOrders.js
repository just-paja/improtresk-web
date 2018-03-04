import { call, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isOrderListRequired } from '../selectors';

import * as constants from '../constants';
import * as api from '../../api';

export function* fetchOrderList() {
  yield call(fetchResourceIfRequired, api.fetchParticipantOrders, {
    isRequired: isOrderListRequired,
    actions: {
      start: constants.ORDERS_FETCH_STARTED,
      success: constants.ORDERS_FETCH_SUCCESS,
      fail: constants.ORDERS_FETCH_ERROR,
    },
  });
}

export function* requireOrderList() {
  yield takeEvery(
    constants.ORDERS_REQUIRED,
    fetchOrderList
  );
}

export default [
  requireOrderList,
];
