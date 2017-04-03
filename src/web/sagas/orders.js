import { fork, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getForm } from '../selectors/forms';
import { workshopsAll } from '../selectors/workshops';
import { getCheapestAccomodation } from '../selectors/accomodation';
import {
  getParticipantLatestOrder,
  getParticipantUnconfirmedOrder,
} from '../selectors/participant';
import { yearActiveNumber } from '../selectors/years';
import { reverse } from '../routeTable';

import { fetchResource } from './common';
import { sendForm } from './forms';

import * as api from '../api';
import * as constants from '../constants/actions';

export const selectOrderSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'order';

export const selectOrderSuccess = action =>
  action.type === constants.FORM_SUBMIT_SUCCESS && action.form === 'order';

export const selectChangeWorkshopSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'changeWorkshop';

export const selectChangeWorkshopSuccess = action =>
  action.type === constants.FORM_SUBMIT_SUCCESS && action.form === 'changeWorkshop';

export function* redirectHome() {
  yield put(push(reverse('participant:home')));
}

export function* orderSetDefaults() {
  const year = yield select(yearActiveNumber);
  const accomodation = yield select(getCheapestAccomodation);
  yield put({
    form: 'order',
    type: constants.FORM_VALUES_SET,
    values: {
      accomodation: accomodation ? accomodation.id : null,
      meals: [],
      year,
    },
  });
}

export function* orderCancel() {
  const order = yield select(getParticipantLatestOrder);
  if (order) {
    yield fork(
      fetchResource,
      api.orderCancel,
      {
        onStart: constants.ORDER_CANCEL_FETCH_STARTED,
        onSuccess: constants.ORDER_CANCEL_FETCH_SUCCESS,
        onError: constants.ORDER_CANCEL_FETCH_ERROR,
        order: order.id,
      }
    );
  }
}

export function* orderConfirm() {
  const order = yield select(getParticipantUnconfirmedOrder);
  if (order) {
    yield fork(
      fetchResource,
      api.orderConfirm,
      {
        onStart: constants.ORDER_CONFIRM_FETCH_STARTED,
        onSuccess: constants.ORDER_CONFIRM_FETCH_SUCCESS,
        onError: constants.ORDER_CONFIRM_FETCH_ERROR,
        order: order.id,
      }
    );
  }
}

export function* orderSubmit() {
  const form = yield select(getForm, 'order');
  yield fork(sendForm, api.orderCreate, 'order', form.values);
}

export function* orderConfirmRedirect(action) {
  yield put({
    type: constants.ORDER_CREATED,
    data: action.data,
  });
  yield put(push(reverse('participant:confirm')));
}

export function* orderCancelRedirect() {
  yield put({ type: constants.ORDER_CANCELED });
  yield fork(redirectHome);
}

export function* orderChangeRedirect() {
  yield put({ type: constants.ORDER_CHANGED });
  yield fork(redirectHome);
}

export function* orderChangeSetDefaults() {
  const order = yield select(getParticipantLatestOrder);
  yield put({
    form: 'changeWorkshop',
    type: constants.FORM_VALUES_SET,
    values: {
      workshop: order ? order.workshop.id : null,
    },
  });
}

export function* orderChangeWorkshopSubmit() {
  const form = yield select(getForm, 'changeWorkshop');
  const order = yield select(getParticipantLatestOrder);
  yield fork(sendForm, api.orderChangeWorkshop, 'changeWorkshop', form.values, {
    order: order.id,
  });
}

export function* bindOrderConfirmRedirect() {
  yield takeLatest(
    selectOrderSubmit,
    orderSubmit
  );
}

export function* bindOrderHomeRedirect() {
  yield takeLatest(
    [
      constants.ORDER_CANCEL_FETCH_SUCCESS,
      constants.ORDER_CONFIRM_FETCH_SUCCESS,
    ],
    orderCancelRedirect
  );
}

export function* bindOrderCancel() {
  yield takeLatest(
    constants.ORDER_CANCEL_REQUESTED,
    orderCancel
  );
}

export function* bindOrderConfirm() {
  yield takeLatest(
    constants.ORDER_CONFIRM_REQUESTED,
    orderConfirm
  );
}

export function* bindOrderSubmit() {
  yield takeLatest(
    selectOrderSuccess,
    orderConfirmRedirect
  );
}

export function* bindOrderSetDefaults() {
  yield takeLatest(
    [
      constants.ACCOMODATION_FETCH_SUCCESS,
      constants.ORDER_FORM_MOUNTED,
    ],
    orderSetDefaults
  );
}

export function* interceptInvalidWorkshop() {
  const form = yield select(getForm, 'order');
  const workshops = yield select(workshopsAll);
  const selectedWorkshop = workshops.find(
    workshop => workshop.id === form.values.workshop
  );

  if (
    form.values.workshop &&
    (
      !selectedWorkshop ||
      selectedWorkshop.capacityStatus.freeSpots === 0
    )
  ) {
    yield put({
      type: constants.FORM_FIELD_CHANGE,
      form: 'order',
      field: 'workshop',
      value: null,
    });
  }
}

export function* interceptInvalidWorkshopChange() {
  const order = yield select(getParticipantLatestOrder);
  const form = yield select(getForm, 'changeWorkshop');
  const workshops = yield select(workshopsAll);

  const selectedWorkshop = workshops.find(
    workshop => workshop.id === form.values.workshop
  );

  if (
    !selectedWorkshop ||
    (
      form.values.workshop &&
      order &&
      order.workshop &&
      order.workshop.id !== form.values.workshop &&
      selectedWorkshop.capacityStatus.freeSpots === 0
    )
  ) {
    yield put({
      type: constants.FORM_FIELD_CHANGE,
      form: 'changeWorkshop',
      field: 'workshop',
      value: order ? order.workshop.id : null,
    });
  }
}

export function* bindInterceptInvalidWorkshop() {
  yield takeLatest(
    constants.YEAR_CAPACITY_FETCH_SUCCESS,
    interceptInvalidWorkshop
  );
}

export function* bindInterceptInvalidWorkshopChange() {
  yield takeLatest(
    constants.YEAR_CAPACITY_FETCH_SUCCESS,
    interceptInvalidWorkshopChange
  );
}

export function* bindChangeWorkshopSubmit() {
  yield takeLatest(selectChangeWorkshopSubmit, orderChangeWorkshopSubmit);
}

export function* bindChangeWorkshopSuccess() {
  yield takeLatest(selectChangeWorkshopSuccess, orderChangeRedirect);
}

export function* bindChangeWorkshopSetDefaults() {
  yield takeLatest(constants.PARTICIPANT_WORKSHOP_CHANGE_MOUNTED, orderChangeSetDefaults);
}


export default [
  bindChangeWorkshopSetDefaults,
  bindChangeWorkshopSubmit,
  bindChangeWorkshopSuccess,
  bindInterceptInvalidWorkshop,
  bindInterceptInvalidWorkshopChange,
  bindOrderCancel,
  bindOrderConfirm,
  bindOrderConfirmRedirect,
  bindOrderHomeRedirect,
  bindOrderSetDefaults,
  bindOrderSubmit,
];
