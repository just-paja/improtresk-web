import { call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from '../../sagas/api';
import { getLatestOrder } from '../selectors';
import { redirectHome } from '../../sagas/redirects';

import * as api from '../../api';
import * as constants from '../constants';

export function* orderCancel() {
  const order = yield select(getLatestOrder);
  if (order) {
    yield call(fetchResource, api.orderCancel, {
      actions: {
        start: constants.ORDER_CANCEL_FETCH_STARTED,
        success: constants.ORDER_CANCEL_FETCH_SUCCESS,
        fail: constants.ORDER_CANCEL_FETCH_ERROR,
      },
      actionData: { order: order.id },
      params: { order: order.id },
    });
  }
}

export function* orderCancelRedirect() {
  yield put({ type: constants.ORDER_CANCELED });
  yield call(redirectHome);
}

export function* onOrderCancel() {
  yield takeLatest(
    constants.ORDER_CANCEL_REQUESTED,
    orderCancel
  );
}

export function* onOrderCancelSuccess() {
  yield takeLatest(
    constants.ORDER_CANCEL_FETCH_SUCCESS,
    redirectHome
  );
}

export default [
  onOrderCancel,
  onOrderCancelSuccess,
];
