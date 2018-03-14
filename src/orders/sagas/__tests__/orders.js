import { call, put, select, takeEvery } from 'redux-saga/effects';

import { fetchResource } from '../../../sagas/api';
import {
  getActiveOrder,
  getUnconfirmedOrder,
} from '../../selectors';
import { getCheapestAccomodation } from '../../../accomodation/selectors';
import { getWorkshopList } from '../../../workshops/selectors';
import { yearActive } from '../../../years/selectors';
import { sendForm } from '../../../forms/sagas/sendForm';
import { redirectHome } from '../../../sagas/redirects';

import * as sagas from '..';
import * as api from '../../../api';

describe('Orders sagas', () => {
  it('selectOrderSubmit binds form submit', () => {
    expect(sagas.selectOrderSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'order',
    })).toBe(true);
  });

  it('selectOrderSuccess binds form submit', () => {
    expect(sagas.selectOrderSuccess({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'order',
    })).toBe(true);
  });

  it('selectChangeWorkshopSuccess binds form submit', () => {
    expect(sagas.selectChangeWorkshopSuccess({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'changeWorkshop',
    })).toBe(true);
  });

  it('selectChangeWorkshopSubmit binds form submit', () => {
    expect(sagas.selectChangeWorkshopSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'changeWorkshop',
    })).toBe(true);
  });

  it('onOrderSubmit binds form submit', () => {
    const saga = sagas.onOrderSubmit();
    expect(saga.next().value).toEqual(takeEvery(
      sagas.selectOrderSuccess,
      sagas.triggerOrdersInvalidate
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onOrderSetDefaults binds form submit', () => {
    const saga = sagas.onOrderSetDefaults();
    expect(saga.next().value).toEqual(takeEvery(
      'ORDER_FORM_SET_DEFAULTS',
      sagas.orderSetDefaults
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onOrderHomeRedirect binds form submit', () => {
    const saga = sagas.onOrderHomeRedirect();
    expect(saga.next().value).toEqual(takeEvery(
      'ORDER_CONFIRM_FETCH_SUCCESS',
      redirectHome
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onOrderConfirmRedirect binds form submit', () => {
    const saga = sagas.onOrderConfirmRedirect();
    expect(saga.next().value).toEqual(takeEvery(
      sagas.selectOrderSubmit,
      sagas.orderSubmit
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onOrderConfirm binds form submit', () => {
    const saga = sagas.onOrderConfirm();
    expect(saga.next().value).toEqual(takeEvery(
      'ORDER_CONFIRM_REQUESTED',
      sagas.orderConfirm
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onChangeWorkshopSubmit binds form submit', () => {
    const saga = sagas.onChangeWorkshopSubmit();
    expect(saga.next().value).toEqual(takeEvery(
      sagas.selectChangeWorkshopSubmit,
      sagas.orderChangeWorkshopSubmit
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onChangeWorkshopSuccess binds form submit', () => {
    const saga = sagas.onChangeWorkshopSuccess();
    expect(saga.next().value).toEqual(takeEvery(
      sagas.selectChangeWorkshopSuccess,
      sagas.orderChangeRedirect
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onChangeWorkshopSetDefaults binds form submit', () => {
    const saga = sagas.onChangeWorkshopSetDefaults();
    expect(saga.next().value).toEqual(takeEvery(
      'PAGE_WORKSHOP_CHANGE_ENTERED',
      sagas.orderChangeSetDefaults
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onInterceptInvalidWorkshop binds form submit', () => {
    const saga = sagas.onInterceptInvalidWorkshop();
    expect(saga.next().value).toEqual(takeEvery(
      'YEAR_CAPACITY_FETCH_SUCCESS',
      sagas.interceptInvalidWorkshop
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onInterceptInvalidWorkshopChange binds form submit', () => {
    const saga = sagas.onInterceptInvalidWorkshopChange();
    expect(saga.next().value).toEqual(takeEvery(
      'YEAR_CAPACITY_FETCH_SUCCESS',
      sagas.interceptInvalidWorkshopChange
    ));
    expect(saga.next().done).toBe(true);
  });

  it('interceptInvalidWorkshop unselects unknown workshop', () => {
    const saga = sagas.interceptInvalidWorkshop();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).toEqual(select(getWorkshopList));
    expect(saga.next([]).value).toEqual(put({
      type: 'FORM_FIELD_CHANGE',
      form: 'order',
      field: 'workshop',
      value: null,
    }));
    expect(saga.next().done).toBe(true);
  });

  it('interceptInvalidWorkshop unselects full workshop', () => {
    const saga = sagas.interceptInvalidWorkshop();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).toEqual(select(getWorkshopList));
    expect(saga.next([
      {
        id: 9,
        capacityStatus: {
          freeSpots: 0,
        },
      },
    ]).value).toEqual(put({
      type: 'FORM_FIELD_CHANGE',
      form: 'order',
      field: 'workshop',
      value: null,
    }));
    expect(saga.next().done).toBe(true);
  });

  it('interceptInvalidWorkshop does nothing when capacity is ok', () => {
    const saga = sagas.interceptInvalidWorkshop();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).toEqual(select(getWorkshopList));
    expect(saga.next([
      {
        id: 9,
        capacityStatus: {
          freeSpots: 1,
        },
      },
    ]).done).toBe(true);
  });

  it('interceptInvalidWorkshopChange does nothing without order', () => {
    const saga = sagas.interceptInvalidWorkshopChange();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 3,
      },
    }).value).toEqual(select(getActiveOrder));
    expect(saga.next().value).toEqual(select(getWorkshopList));
    expect(saga.next([
      {
        id: 3,
        capacityStatus: {
          freeSpots: 0,
        },
      },
    ]).done).toEqual(true);
  });

  it('interceptInvalidWorkshopChange does nothing without order workshop', () => {
    const saga = sagas.interceptInvalidWorkshopChange();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 3,
      },
    }).value).toEqual(select(getActiveOrder));
    expect(saga.next({ id: 1 }).value).toEqual(select(getWorkshopList));
    expect(saga.next([
      {
        id: 3,
        capacityStatus: {
          freeSpots: 0,
        },
      },
    ]).done).toEqual(true);
  });

  it('interceptInvalidWorkshopChange does nothing when order workshop is same as selected', () => {
    const saga = sagas.interceptInvalidWorkshopChange();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 3,
      },
    }).value).toEqual(select(getActiveOrder));
    expect(saga.next({ id: 1, workshop: { id: 3 } }).value).toEqual(select(getWorkshopList));
    expect(saga.next([
      {
        id: 3,
        capacityStatus: {
          freeSpots: 0,
        },
      },
    ]).done).toEqual(true);
  });

  it('interceptInvalidWorkshopChange does nothing when selected workshop has free spots', () => {
    const saga = sagas.interceptInvalidWorkshopChange();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 6,
      },
    }).value).toEqual(select(getActiveOrder));
    expect(saga.next({ id: 1, workshop: { id: 3 } }).value).toEqual(select(getWorkshopList));
    expect(saga.next([
      {
        id: 6,
        capacityStatus: {
          freeSpots: 1,
        },
      },
    ]).done).toEqual(true);
  });

  it('interceptInvalidWorkshopChange resets value to order settings when no workshop is selected', () => {
    const saga = sagas.interceptInvalidWorkshopChange();
    saga.next();
    expect(saga.next({ values: {} }).value).toEqual(select(getActiveOrder));
    expect(saga.next({ id: 1, workshop: { id: 3 } }).value).toEqual(select(getWorkshopList));
    expect(saga.next([]).value).toEqual(put({
      type: 'FORM_FIELD_CHANGE',
      form: 'changeWorkshop',
      field: 'workshop',
      value: 3,
    }));
  });

  it('interceptInvalidWorkshopChange resets form value when selected workshop has no free spots', () => {
    const saga = sagas.interceptInvalidWorkshopChange();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 6,
      },
    }).value).toEqual(select(getActiveOrder));
    expect(saga.next({
      id: 1,
      workshop: {
        id: 3,
      },
    }).value).toEqual(select(getWorkshopList));
    expect(saga.next([
      {
        id: 6,
        capacityStatus: {
          freeSpots: 0,
        },
      },
    ]).value).toEqual(put({
      type: 'FORM_FIELD_CHANGE',
      form: 'changeWorkshop',
      field: 'workshop',
      value: 3,
    }));
  });

  it('triggerOrdersInvalidate redirecs to order confirm', () => {
    const saga = sagas.triggerOrdersInvalidate({ data: { foo: 'bar' } });
    expect(saga.next().value).toEqual(put({ type: 'ORDERS_INVALIDATE' }));
    expect(saga.next().value).toEqual(call(redirectHome));
    expect(saga.next().done).toBe(true);
  });

  it('orderSubmit sends the order form', () => {
    const saga = sagas.orderSubmit();
    saga.next();
    expect(saga.next({
      values: { foo: 'bar' },
    }).value).toEqual(call(
      sendForm,
      api.orderCreate,
      'order',
      { foo: 'bar' }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('orderConfirm sends order confirmation', () => {
    const saga = sagas.orderConfirm();
    expect(saga.next().value).toEqual(select(getUnconfirmedOrder));
    expect(saga.next({ id: 78 }).value).toEqual(call(
      fetchResource,
      api.orderConfirm,
      {
        actions: {
          start: 'ORDER_CONFIRM_FETCH_STARTED',
          success: 'ORDER_CONFIRM_FETCH_SUCCESS',
          fail: 'ORDER_CONFIRM_FETCH_ERROR',
        },
        params: {
          order: 78,
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('orderConfirm does nothing without order', () => {
    const saga = sagas.orderConfirm();
    expect(saga.next().value).toEqual(select(getUnconfirmedOrder));
    expect(saga.next(null).done).toBe(true);
  });

  it('orderChangeRedirect sends notice to store redirects home', () => {
    const saga = sagas.orderChangeRedirect();
    expect(saga.next().value).toEqual(put({
      type: 'ORDER_CHANGED',
    }));
    expect(saga.next().value).toEqual(call(redirectHome));
    expect(saga.next(null).done).toBe(true);
  });

  it('orderChangeSetDefaults sets default values for workshop change form when workshop is not available', () => {
    const saga = sagas.orderChangeSetDefaults();
    expect(saga.next().value).toEqual(select(getActiveOrder));
    expect(saga.next().value).toEqual(put({
      form: 'changeWorkshop',
      type: 'FORM_VALUES_SET',
      values: {
        workshop: null,
      },
    }));
    expect(saga.next(null).done).toBe(true);
  });

  it('orderChangeSetDefaults sets default values for workshop change form when workshop is available', () => {
    const saga = sagas.orderChangeSetDefaults();
    saga.next();
    expect(saga.next({
      workshop: {
        id: 9,
      },
    }).value).toEqual(put({
      form: 'changeWorkshop',
      type: 'FORM_VALUES_SET',
      values: {
        workshop: 9,
      },
    }));
    expect(saga.next(null).done).toBe(true);
  });

  it('orderChangeWorkshopSubmit sets default values for workshop change form when workshop is available', () => {
    const saga = sagas.orderChangeWorkshopSubmit();
    saga.next();
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).toEqual(select(getActiveOrder));
    expect(saga.next({
      id: 13,
    }).value).toEqual(call(
      sendForm,
      api.orderChangeWorkshop,
      'changeWorkshop',
      { workshop: 9 },
      {
        order: 13,
      }
    ));
    expect(saga.next(null).done).toBe(true);
  });

  it('orderSetDefaults sets default values', () => {
    const saga = sagas.orderSetDefaults();
    expect(saga.next().value).toEqual(select(yearActive));
    expect(saga.next({
      year: '2017',
      startDate: '2017-03-04',
      endDate: '2017-03-05',
    }).value).toEqual(select(getCheapestAccomodation));
    expect(saga.next({ id: 92 }).value).toEqual(put({
      form: 'order',
      type: 'FORM_VALUES_SET',
      values: {
        accomodation: 92,
        meals: [],
        year: '2017',
        stayLength: [
          '2017-03-04',
          '2017-03-05',
        ],
      },
    }));
    expect(saga.next().done).toBe(true);
  });

  it('orderSetDefaults sets default values without accomodation', () => {
    const saga = sagas.orderSetDefaults();
    expect(saga.next().value).toEqual(select(yearActive));
    expect(saga.next({
      year: '2017',
      startDate: '2017-03-04',
      endDate: '2017-03-05',
    }).value).toEqual(select(getCheapestAccomodation));
    expect(saga.next(null).value).toEqual(put({
      form: 'order',
      type: 'FORM_VALUES_SET',
      values: {
        accomodation: null,
        meals: [],
        year: '2017',
        stayLength: [
          '2017-03-04',
          '2017-03-05',
        ],
      },
    }));
    expect(saga.next().done).toBe(true);
  });
});
