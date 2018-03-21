import { put, takeEvery } from 'redux-saga/effects';

import { accomodationListFetch } from '../../accomodation/actions';
import { orderListFetch } from '../actions';
import { mealListFetch } from '../../food/actions';
import { requireWorkshopList } from '../../workshops/actions';

import createFetchSaga from '../../sagas/createFetchSaga';

function* handleOrderDepsRequire() {
  yield put(accomodationListFetch());
  yield put(mealListFetch());
  yield put(requireWorkshopList());
}

function* onOrderListRequire() {
  yield takeEvery(orderListFetch.TRIGGER, handleOrderDepsRequire);
}

export default [
  ...createFetchSaga(orderListFetch),
  onOrderListRequire,
];
