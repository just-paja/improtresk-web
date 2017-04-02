import { expect } from 'chai';
import { fork, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { fetchResource } from '../../../src/web/sagas/common';
import { getForm } from '../../../src/web/selectors/forms';
import { getCheapestAccomodation } from '../../../src/web/selectors/accomodation';
import {
  getParticipantLatestOrder,
  getParticipantUnconfirmedOrder,
} from '../../../src/web/selectors/participant';
import { sendForm } from '../../../src/web/sagas/forms';
import { workshopsAll } from '../../../src/web/selectors/workshops';
import { yearActiveNumber } from '../../../src/web/selectors/years';
import {
  bindInterceptInvalidWorkshop,
  bindOrderCancel,
  bindOrderConfirm,
  bindOrderConfirmRedirect,
  bindOrderHomeRedirect,
  bindOrderSetDefaults,
  bindOrderSubmit,
  interceptInvalidWorkshop,
  orderCancel,
  orderCancelRedirect,
  orderConfirm,
  orderConfirmRedirect,
  orderSetDefaults,
  orderSubmit,
  redirectHome,
  selectOrderSubmit,
  selectOrderSuccess,
} from '../../../src/web/sagas/orders';

import * as api from '../../../src/web/api';

describe('Schedule sagas', () => {
  it('selectOrderSubmit binds form submit', () => {
    expect(selectOrderSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'order',
    })).to.equal(true);
  });
  it('selectOrderSuccess binds form submit', () => {
    expect(selectOrderSuccess({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'order',
    })).to.equal(true);
  });
  it('bindOrderSubmit binds form submit', () => {
    const saga = bindOrderSubmit();
    expect(saga.next().value).to.eql(takeLatest(
      selectOrderSuccess,
      orderConfirmRedirect
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindOrderSetDefaults binds form submit', () => {
    const saga = bindOrderSetDefaults();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'ACCOMODATION_FETCH_SUCCESS',
        'ORDER_FORM_MOUNTED',
      ],
      orderSetDefaults
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindOrderHomeRedirect binds form submit', () => {
    const saga = bindOrderHomeRedirect();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'ORDER_CANCEL_FETCH_SUCCESS',
        'ORDER_CONFIRM_FETCH_SUCCESS',
      ],
      orderCancelRedirect
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindOrderConfirmRedirect binds form submit', () => {
    const saga = bindOrderConfirmRedirect();
    expect(saga.next().value).to.eql(takeLatest(
      selectOrderSubmit,
      orderSubmit
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindOrderConfirm binds form submit', () => {
    const saga = bindOrderConfirm();
    expect(saga.next().value).to.eql(takeLatest(
      'ORDER_CONFIRM_REQUESTED',
      orderConfirm
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindOrderCancel binds form submit', () => {
    const saga = bindOrderCancel();
    expect(saga.next().value).to.eql(takeLatest(
      'ORDER_CANCEL_REQUESTED',
      orderCancel
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindInterceptInvalidWorkshop binds form submit', () => {
    const saga = bindInterceptInvalidWorkshop();
    expect(saga.next().value).to.eql(takeLatest(
      'YEAR_CAPACITY_FETCH_SUCCESS',
      interceptInvalidWorkshop
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('interceptInvalidWorkshop unselects unknown workshop', () => {
    const saga = interceptInvalidWorkshop();
    expect(saga.next().value).to.eql(select(getForm, 'order'));
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).to.eql(select(workshopsAll));
    expect(saga.next([]).value).to.eql(put({
      type: 'FORM_FIELD_CHANGE',
      form: 'order',
      field: 'workshop',
      value: null,
    }));
    expect(saga.next().done).to.equal(true);
  });
  it('interceptInvalidWorkshop unselects full workshop', () => {
    const saga = interceptInvalidWorkshop();
    expect(saga.next().value).to.eql(select(getForm, 'order'));
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).to.eql(select(workshopsAll));
    expect(saga.next([
      {
        id: 9,
        capacityStatus: {
          freeSpots: 0,
        },
      },
    ]).value).to.eql(put({
      type: 'FORM_FIELD_CHANGE',
      form: 'order',
      field: 'workshop',
      value: null,
    }));
    expect(saga.next().done).to.equal(true);
  });
  it('interceptInvalidWorkshop does nothing when capacity is ok', () => {
    const saga = interceptInvalidWorkshop();
    expect(saga.next().value).to.eql(select(getForm, 'order'));
    expect(saga.next({
      values: {
        workshop: 9,
      },
    }).value).to.eql(select(workshopsAll));
    expect(saga.next([
      {
        id: 9,
        capacityStatus: {
          freeSpots: 1,
        },
      },
    ]).done).to.equal(true);
  });
  it('orderCancelRedirect redirecs to home', () => {
    const saga = orderCancelRedirect();
    expect(saga.next().value).to.eql(put({ type: 'ORDER_CANCELED' }));
    expect(saga.next().value).to.eql(fork(redirectHome));
    expect(saga.next().done).to.equal(true);
  });
  it('orderConfirmRedirect redirecs to order confirm', () => {
    const saga = orderConfirmRedirect({ data: { foo: 'bar' } });
    expect(saga.next().value).to.eql(put({
      type: 'ORDER_CREATED',
      data: { foo: 'bar' },
    }));
    expect(saga.next().value).to.eql(put(push('/ucastnik/potvrzeni')));
    expect(saga.next().done).to.equal(true);
  });
  it('orderSubmit sends the order form', () => {
    const saga = orderSubmit();
    expect(saga.next().value).to.eql(select(getForm, 'order'));
    expect(saga.next({
      values: { foo: 'bar' },
    }).value).to.eql(fork(
      sendForm,
      api.orderCreate,
      'order',
      { foo: 'bar' }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('orderConfirm sends order confirmation', () => {
    const saga = orderConfirm();
    expect(saga.next().value).to.eql(select(getParticipantUnconfirmedOrder));
    expect(saga.next({ id: 78 }).value).to.eql(fork(
      fetchResource,
      api.orderConfirm,
      {
        onStart: 'ORDER_CONFIRM_FETCH_STARTED',
        onSuccess: 'ORDER_CONFIRM_FETCH_SUCCESS',
        onError: 'ORDER_CONFIRM_FETCH_ERROR',
        order: 78,
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('orderConfirm does nothing without order', () => {
    const saga = orderConfirm();
    expect(saga.next().value).to.eql(select(getParticipantUnconfirmedOrder));
    expect(saga.next(null).done).to.equal(true);
  });
  it('orderCancel sends order cancel', () => {
    const saga = orderCancel();
    expect(saga.next().value).to.eql(select(getParticipantLatestOrder));
    expect(saga.next({ id: 78 }).value).to.eql(fork(
      fetchResource,
      api.orderCancel,
      {
        onStart: 'ORDER_CANCEL_FETCH_STARTED',
        onSuccess: 'ORDER_CANCEL_FETCH_SUCCESS',
        onError: 'ORDER_CANCEL_FETCH_ERROR',
        order: 78,
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('orderCancel does nothing without order', () => {
    const saga = orderCancel();
    expect(saga.next().value).to.eql(select(getParticipantLatestOrder));
    expect(saga.next(null).done).to.equal(true);
  });
  it('orderSetDefaults sets default values', () => {
    const saga = orderSetDefaults();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(select(getCheapestAccomodation));
    expect(saga.next({ id: 92 }).value).to.eql(put({
      form: 'order',
      type: 'FORM_VALUES_SET',
      values: {
        accomodation: 92,
        meals: [],
        year: '2017',
      },
    }));
    expect(saga.next().done).to.equal(true);
  });
  it('orderSetDefaults sets default values without accomodation', () => {
    const saga = orderSetDefaults();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(select(getCheapestAccomodation));
    expect(saga.next(null).value).to.eql(put({
      form: 'order',
      type: 'FORM_VALUES_SET',
      values: {
        accomodation: null,
        meals: [],
        year: '2017',
      },
    }));
    expect(saga.next().done).to.equal(true);
  });
});
