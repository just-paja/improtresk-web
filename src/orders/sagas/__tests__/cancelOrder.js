import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Orders cancel saga', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('does nothing when there is no order', () => {
    const sagaTester = getSagaTester({});
    api.orderCancel.returns({
      status: 204,
      ok: true,
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ORDER_CANCEL_REQUESTED' });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'ORDER_CANCEL_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'ORDER_CANCEL_FETCH_SUCCESS',
    }));
    expect(api.orderCancel.called).toBeFalsy();
  });

  it('does calls order cancel API', () => {
    const sagaTester = getSagaTester({
      orders: {
        list: {
          data: [
            {
              id: 300,
              reservation: {},
              year: 8,
            },
          ],
        },
      },
      years: {
        list: {
          data: [
            {
              id: 8,
              year: 2018,
            },
          ],
        },
      },
    });
    api.orderCancel.returns({
      status: 204,
      ok: true,
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ORDER_CANCEL_REQUESTED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDER_CANCEL_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDER_CANCEL_FETCH_SUCCESS',
    }));
    expect(api.orderCancel.calledOnce).toBeTruthy();
    expect(api.orderCancel.getCall(0).args).toContainEqual(expect.objectContaining({
      order: 300,
    }));
  });

  it.skip('onOrderCancel binds form submit', () => {
    const saga = sagas.onOrderCancel();
    expect(saga.next().value).toEqual(takeLatest(
      'ORDER_CANCEL_REQUESTED',
      sagas.orderCancel
    ));
    expect(saga.next().done).toBe(true);
  });

  it.skip('orderCancelRedirect redirecs to home', () => {
    const saga = sagas.orderCancelRedirect();
    expect(saga.next().value).toEqual(put({ type: 'ORDER_cancelled' }));
    expect(saga.next().value).toEqual(call(redirectHome));
    expect(saga.next().done).toBe(true);
  });

  it.skip('orderCancel sends order cancel', () => {
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

  it.skip('orderCancel does nothing without order', () => {
    const saga = sagas.orderCancel();
    expect(saga.next().value).toEqual(select(getLatestOrder));
    expect(saga.next(null).done).toBe(true);
  });
});
