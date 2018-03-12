import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResource } from '../../sagas/api';
import { getActiveOrder } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

function* orderCancel() {
  const order = yield select(getActiveOrder);
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

function* onOrderCancel() {
  yield takeEvery(
    constants.ORDER_CANCEL_REQUESTED,
    orderCancel
  );
}

export default [
  onOrderCancel,
];
