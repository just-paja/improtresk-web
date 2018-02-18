import { call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from '../../../sagas/api';
import {
  getLatestOrder,
  getUnconfirmedOrder,
} from '../../selectors';
import { getForm } from '../../../forms/selectors';
import { getCheapestAccomodation } from '../../../accomodation/selectors';
import { getWorkshopList } from '../../../workshops/selectors';
import { yearActiveNumber } from '../../../years/selectors';
import { sendForm } from '../../../forms/sagas/sendForm';
import { redirectHome, redirectOrderConfirm } from '../../../sagas/redirects';

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

  it('bindOrderSubmit binds form submit', () => {
    const saga = sagas.bindOrderSubmit();
    expect(saga.next().value).toEqual(takeLatest(
      sagas.selectOrderSuccess,
      sagas.orderConfirmRedirect
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindOrderSetDefaults binds form submit', () => {
    const saga = sagas.bindOrderSetDefaults();
    expect(saga.next().value).toEqual(takeLatest(
      'ORDER_FORM_MOUNTED',
      sagas.orderSetDefaults
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindOrderHomeRedirect binds form submit', () => {
    const saga = sagas.bindOrderHomeRedirect();
    expect(saga.next().value).toEqual(takeLatest(
      'ORDER_CONFIRM_FETCH_SUCCESS',
      redirectHome
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindOrderConfirmRedirect binds form submit', () => {
    const saga = sagas.bindOrderConfirmRedirect();
    expect(saga.next().value).toEqual(takeLatest(
      sagas.selectOrderSubmit,
      sagas.orderSubmit
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindOrderConfirm binds form submit', () => {
    const saga = sagas.bindOrderConfirm();
    expect(saga.next().value).toEqual(takeLatest(
      'ORDER_CONFIRM_REQUESTED',
      sagas.orderConfirm
    ));
    expect(saga.next().done).toBe(true);
  });

  it('onOrderCancel binds form submit', () => {
    const saga = sagas.onOrderCancel();
    expect(saga.next().value).toEqual(takeLatest(
      'ORDER_CANCEL_REQUESTED',
      sagas.orderCancel
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindChangeWorkshopSubmit binds form submit', () => {
    const saga = sagas.bindChangeWorkshopSubmit();
    expect(saga.next().value).toEqual(takeLatest(
      sagas.selectChangeWorkshopSubmit,
      sagas.orderChangeWorkshopSubmit
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindChangeWorkshopSuccess binds form submit', () => {
    const saga = sagas.bindChangeWorkshopSuccess();
    expect(saga.next().value).toEqual(takeLatest(
      sagas.selectChangeWorkshopSuccess,
      sagas.orderChangeRedirect
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindChangeWorkshopSetDefaults binds form submit', () => {
    const saga = sagas.bindChangeWorkshopSetDefaults();
    expect(saga.next().value).toEqual(takeLatest(
      'PAGE_WORKSHOP_CHANGE_ENTERED',
      sagas.orderChangeSetDefaults
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindInterceptInvalidWorkshop binds form submit', () => {
    const saga = sagas.bindInterceptInvalidWorkshop();
    expect(saga.next().value).toEqual(takeLatest(
      'YEAR_CAPACITY_FETCH_SUCCESS',
      sagas.interceptInvalidWorkshop
    ));
    expect(saga.next().done).toBe(true);
  });

  it('bindInterceptInvalidWorkshopChange binds form submit', () => {
    const saga = sagas.bindInterceptInvalidWorkshopChange();
    expect(saga.next().value).toEqual(takeLatest(
      'YEAR_CAPACITY_FETCH_SUCCESS',
      sagas.interceptInvalidWorkshopChange
    ));
    expect(saga.next().done).toBe(true);
  });

  it('interceptInvalidWorkshop unselects unknown workshop', () => {
    const saga = sagas.interceptInvalidWorkshop();
    expect(saga.next().value).toEqual(select(getForm, 'order'));
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
    expect(saga.next().value).toEqual(select(getForm, 'order'));
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
    expect(saga.next().value).toEqual(select(getForm, 'order'));
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
    expect(saga.next().value).toEqual(select(getForm, 'changeWorkshop'));
    expect(saga.next({
      values: {
        workshop: 3,
      },
    }).value).toEqual(select(getLatestOrder));
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
    expect(saga.next().value).toEqual(select(getForm, 'changeWorkshop'));
    expect(saga.next({
      values: {
        workshop: 3,
      },
    }).value).toEqual(select(getLatestOrder));
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
    expect(saga.next().value).toEqual(select(getForm, 'changeWorkshop'));
    expect(saga.next({
      values: {
        workshop: 3,
      },
    }).value).toEqual(select(getLatestOrder));
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
    expect(saga.next().value).toEqual(select(getForm, 'changeWorkshop'));
    expect(saga.next({
      values: {
        workshop: 6,
      },
    }).value).toEqual(select(getLatestOrder));
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
    expect(saga.next().value).toEqual(select(getForm, 'changeWorkshop'));
    expect(saga.next({ values: {} }).value).toEqual(select(getLatestOrder));
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
    expect(saga.next().value).toEqual(select(getForm, 'changeWorkshop'));
    expect(saga.next({
      values: {
        workshop: 6,
      },
    }).value).toEqual(select(getLatestOrder));
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

  it('orderCancelRedirect redirecs to home', () => {
    const saga = sagas.orderCancelRedirect();
    expect(saga.next().value).toEqual(put({ type: 'ORDER_CANCELED' }));
    expect(saga.next().value).toEqual(call(redirectHome));
    expect(saga.next().done).toBe(true);
  });

  it('orderConfirmRedirect redirecs to order confirm', () => {
    const saga = sagas.orderConfirmRedirect({ data: { foo: 'bar' } });
    expect(saga.next().value).toEqual(put({
      type: 'ORDER_CREATED',
      data: { foo: 'bar' },
    }));
    expect(saga.next().value).toEqual(call(redirectOrderConfirm));
    expect(saga.next().done).toBe(true);
  });

  it('orderSubmit sends the order form', () => {
    const saga = sagas.orderSubmit();
    expect(saga.next().value).toEqual(select(getForm, 'order'));
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
    expect(saga.next().value).toEqual(select(getLatestOrder));
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
    expect(saga.next().value).toEqual(select(getLatestOrder));
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
    expect(saga.next().value).toEqual(select(getForm, 'changeWorkshop'));
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).toEqual(select(getLatestOrder));
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

  it('orderCancel sends order cancel', () => {
    const saga = sagas.orderCancel();
    expect(saga.next().value).toEqual(select(getLatestOrder));
    expect(saga.next({ id: 78 }).value).toEqual(call(
      fetchResource,
      api.orderCancel,
      {
        actions: {
          start: 'ORDER_CANCEL_FETCH_STARTED',
          success: 'ORDER_CANCEL_FETCH_SUCCESS',
          fail: 'ORDER_CANCEL_FETCH_ERROR',
        },
        params: {
          order: 78,
        },
        actionData: {
          order: 78,
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('orderCancel does nothing without order', () => {
    const saga = sagas.orderCancel();
    expect(saga.next().value).toEqual(select(getLatestOrder));
    expect(saga.next(null).done).toBe(true);
  });

  it('orderSetDefaults sets default values', () => {
    const saga = sagas.orderSetDefaults();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(select(getCheapestAccomodation));
    expect(saga.next({ id: 92 }).value).toEqual(put({
      form: 'order',
      type: 'FORM_VALUES_SET',
      values: {
        accomodation: 92,
        meals: [],
        year: '2017',
      },
    }));
    expect(saga.next().done).toBe(true);
  });

  it('orderSetDefaults sets default values without accomodation', () => {
    const saga = sagas.orderSetDefaults();
    expect(saga.next().value).toEqual(select(yearActiveNumber));
    expect(saga.next('2017').value).toEqual(select(getCheapestAccomodation));
    expect(saga.next(null).value).toEqual(put({
      form: 'order',
      type: 'FORM_VALUES_SET',
      values: {
        accomodation: null,
        meals: [],
        year: '2017',
      },
    }));
    expect(saga.next().done).toBe(true);
  });
});
