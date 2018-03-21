import { change, getFormValues } from 'redux-form';
import { put, select, takeEvery } from 'redux-saga/effects';

import { orderChange } from '../actions';
import { getWorkshopList } from '../../workshops/selectors';
import { redirectHome } from '../../sagas/redirects';
import { getActiveOrder } from '../selectors';

import * as years from '../../years/constants';


function* onOrderHomeRedirect() {
  yield takeEvery(orderChange.SUCCESS, redirectHome);
}

export function* interceptInvalidWorkshopChange() {
  const form = yield select(getFormValues, orderChange.form);
  const order = yield select(getActiveOrder);
  const workshops = yield select(getWorkshopList);
  const selectedWorkshop = workshops.find(workshop => workshop.id === form.workshop);

  if (order && order.workshop) {
    if (
      !selectedWorkshop ||
      (
        form.workshop &&
        order.workshop.id !== form.workshop &&
        selectedWorkshop.capacityStatus.freeSpots === 0
      )
    ) {
      yield put(change(orderChange.form, 'workshop', null));
    }
  }
}

export function* onInterceptInvalidWorkshopChange() {
  yield takeEvery(
    years.YEAR_CAPACITY_FETCH_SUCCESS,
    interceptInvalidWorkshopChange
  );
}

export default [
  onInterceptInvalidWorkshopChange,
  onOrderHomeRedirect,
];
