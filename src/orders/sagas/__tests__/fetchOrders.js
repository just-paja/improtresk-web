import { call, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { isOrderListRequired } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('Orders fetch sagas', () => {
  it('fetchOrderList fetches order list', () => {
    const gen = sagas.fetchOrderList();
    expect(gen.next().value).toEqual(
      call(fetchResourceIfRequired, api.fetchParticipantOrders, {
        isRequired: isOrderListRequired,
        actions: {
          start: 'ORDERS_FETCH_STARTED',
          success: 'ORDERS_FETCH_SUCCESS',
          fail: 'ORDERS_FETCH_ERROR',
        },
      })
    );
    expect(gen.next().done).toBeTruthy();
  });

  it('requireOrderList requires order list', () => {
    const gen = sagas.requireOrderList();
    expect(gen.next().value).toEqual(takeLatest(
      'ORDERS_REQUIRED',
      sagas.fetchOrderList
    ));
    expect(gen.next().done).toBeTruthy();
  });
});
