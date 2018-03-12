import { call, put, select, takeEvery } from 'redux-saga/effects';

import { fetchResource } from '../../sagas/api';
import { getForm } from '../../forms/selectors';
import { invalidateOrders } from '../actions';
import { getWorkshopList } from '../../workshops/selectors';
import { getCheapestAccomodation } from '../../accomodation/selectors';
import { yearActiveNumber } from '../../years/selectors';
import { redirectHome } from '../../sagas/redirects';
import {
  getActiveOrder,
  getOrderedMeals,
  getOrderForm,
  getUnconfirmedOrder,
} from '../selectors';

import { sendForm } from '../../forms/sagas/sendForm';

import {
  FORM_FIELD_CHANGE,
  FORM_SUBMIT_ALLOWED,
  FORM_SUBMIT_SUCCESS,
  FORM_VALUES_SET,
} from '../../forms/constants';

import { PAGE_WORKSHOP_CHANGE_ENTERED } from '../../pages/constants';

import * as api from '../../api';
import * as constants from '../constants';
import * as years from '../../years/constants';


export const selectOrderSubmit = action =>
  action.type === FORM_SUBMIT_ALLOWED && action.form === 'order';

export const selectOrderSuccess = action =>
  action.type === FORM_SUBMIT_SUCCESS && action.form === 'order';

export const selectChangeWorkshopSubmit = action =>
  action.type === FORM_SUBMIT_ALLOWED && action.form === 'changeWorkshop';

export const selectChangeWorkshopSuccess = action =>
  action.type === FORM_SUBMIT_SUCCESS && action.form === 'changeWorkshop';

export const selectChangeFoodSubmit = action =>
  action.type === FORM_SUBMIT_ALLOWED && action.form === 'changeFood';

export const selectChangeFoodSuccess = action =>
  action.type === FORM_SUBMIT_SUCCESS && action.form === 'changeFood';

export function* orderSetDefaults() {
  const year = yield select(yearActiveNumber);
  const accomodation = yield select(getCheapestAccomodation);
  yield put({
    form: 'order',
    type: FORM_VALUES_SET,
    values: {
      accomodation: accomodation ? accomodation.id : null,
      meals: [],
      year,
    },
  });
}

export function* orderConfirm() {
  const order = yield select(getUnconfirmedOrder);
  if (order) {
    yield call(fetchResource, api.orderConfirm, {
      actions: {
        start: constants.ORDER_CONFIRM_FETCH_STARTED,
        success: constants.ORDER_CONFIRM_FETCH_SUCCESS,
        fail: constants.ORDER_CONFIRM_FETCH_ERROR,
      },
      params: { order: order.id },
    });
  }
}

export function* orderSubmit() {
  const form = yield select(getOrderForm);
  yield call(sendForm, api.orderCreate, 'order', form.values);
}

export function* orderChangeRedirect() {
  yield put({ type: constants.ORDER_CHANGED });
  yield call(redirectHome);
}

export function* orderChangeSetDefaults() {
  const order = yield select(getActiveOrder);
  yield put({
    form: 'changeWorkshop',
    type: FORM_VALUES_SET,
    values: {
      workshop: order ? order.workshop.id : null,
    },
  });
}

export function* orderChangeFoodSetDefaults() {
  const meals = yield select(getOrderedMeals);
  const values = meals.reduce((accumulator, meal) => ({
    ...accumulator,
    [meal.id]: {
      food: meal.orderedFood ? meal.orderedFood.id : null,
      soup: meal.orderedFood ? meal.orderedSoup.id : null,
    },
  }), {});
  yield put({
    form: 'changeFood',
    type: FORM_VALUES_SET,
    values,
  });
}

export function* orderChangeWorkshopSubmit() {
  const form = yield select(getForm, 'changeWorkshop');
  const order = yield select(getActiveOrder);
  yield call(sendForm, api.orderChangeWorkshop, 'changeWorkshop', form.values, {
    order: order.id,
  });
}

export function* orderChangeFoodSubmit() {
  const form = yield select(getForm, 'changeFood');
  const order = yield select(getActiveOrder);
  const values = Object.keys(form.values).reduce((accumulator, mealId) => ({
    foods: [...accumulator.foods, form.values[mealId].food].filter(item => !!item),
    soups: [...accumulator.soups, form.values[mealId].soup].filter(item => !!item),
  }), {
    foods: [],
    soups: [],
  });
  yield call(sendForm, api.orderChangeFood, 'changeFood', values, {
    order: order.id,
  });
}

export function* onOrderConfirmRedirect() {
  yield takeEvery(
    selectOrderSubmit,
    orderSubmit
  );
}

export function* onOrderHomeRedirect() {
  yield takeEvery(
    constants.ORDER_CONFIRM_FETCH_SUCCESS,
    redirectHome
  );
}

export function* onOrderConfirm() {
  yield takeEvery(
    constants.ORDER_CONFIRM_REQUESTED,
    orderConfirm
  );
}

export function* triggerOrdersInvalidate() {
  yield put(invalidateOrders());
  yield call(redirectHome);
}

export function* onOrderSubmit() {
  yield takeEvery(
    selectOrderSuccess,
    triggerOrdersInvalidate
  );
}

export function* onOrderSetDefaults() {
  yield takeEvery(
    constants.ORDER_FORM_MOUNTED,
    orderSetDefaults
  );
}

export function* interceptInvalidWorkshop() {
  const form = yield select(getForm, 'order');
  const workshops = yield select(getWorkshopList);
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
      type: FORM_FIELD_CHANGE,
      form: 'order',
      field: 'workshop',
      value: null,
    });
  }
}

export function* interceptInvalidWorkshopChange() {
  const form = yield select(getForm, 'changeWorkshop');
  const order = yield select(getActiveOrder);
  const workshops = yield select(getWorkshopList);

  const selectedWorkshop = workshops.find(
    workshop => workshop.id === form.values.workshop
  );

  if (order && order.workshop) {
    if (
      !selectedWorkshop ||
      (
        form.values.workshop &&
        order.workshop.id !== form.values.workshop &&
        selectedWorkshop.capacityStatus.freeSpots === 0
      )
    ) {
      yield put({
        type: FORM_FIELD_CHANGE,
        form: 'changeWorkshop',
        field: 'workshop',
        value: order.workshop.id,
      });
    }
  }
}

export function* onInterceptInvalidWorkshop() {
  yield takeEvery(
    years.YEAR_CAPACITY_FETCH_SUCCESS,
    interceptInvalidWorkshop
  );
}

export function* onInterceptInvalidWorkshopChange() {
  yield takeEvery(
    years.YEAR_CAPACITY_FETCH_SUCCESS,
    interceptInvalidWorkshopChange
  );
}

export function* onChangeWorkshopSubmit() {
  yield takeEvery(selectChangeWorkshopSubmit, orderChangeWorkshopSubmit);
}

export function* onChangeFoodSubmit() {
  yield takeEvery(selectChangeFoodSubmit, orderChangeFoodSubmit);
}

export function* onChangeWorkshopSuccess() {
  yield takeEvery(selectChangeWorkshopSuccess, orderChangeRedirect);
}

export function* onChangeFoodSuccess() {
  yield takeEvery(selectChangeFoodSuccess, orderChangeRedirect);
}

export function* onChangeWorkshopSetDefaults() {
  yield takeEvery(PAGE_WORKSHOP_CHANGE_ENTERED, orderChangeSetDefaults);
}

export function* onChangeFoodSetDefaults() {
  yield takeEvery(
    [
      constants.MEALS_FETCH_SUCCESS,
      constants.ORDERS_FETCH_SUCCESS,
      constants.PARTICIPANT_FOOD_CHANGE_MOUNTED,
    ],
    orderChangeFoodSetDefaults
  );
}


export default [
  onChangeFoodSetDefaults,
  onChangeFoodSubmit,
  onChangeFoodSuccess,
  onChangeWorkshopSetDefaults,
  onChangeWorkshopSubmit,
  onChangeWorkshopSuccess,
  onInterceptInvalidWorkshop,
  onInterceptInvalidWorkshopChange,
  onOrderConfirm,
  onOrderConfirmRedirect,
  onOrderHomeRedirect,
  onOrderSetDefaults,
  onOrderSubmit,
];
