import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { requireAccomodationList } from '../../accomodation/actions';
import { requireMealList } from '../../food/actions';
import { requireWorkshopList } from '../../workshops/actions';
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

function* requireOrderList() {
  yield put(requireMealList());
  yield put(requireAccomodationList());
  yield put(requireWorkshopList());
  yield call(fetchOrderList);
}

export function* onOrderListRequire() {
  yield takeEvery([
    constants.ORDERS_REQUIRED,
    constants.ORDER_CANCEL_FETCH_SUCCESS,
    constants.ORDERS_INVALIDATE,
    constants.ORDER_CONFIRM_FETCH_SUCCESS,
  ], requireOrderList);
}

export default [
  onOrderListRequire,
];
