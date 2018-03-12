import sinon from 'sinon';

import * as api from '../../../api';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

describe('Order fetch saga', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('calls fetch order list from API when required', () => {
    const sagaTester = getSagaTester({});
    api.fetchParticipantOrders.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 500,
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ORDERS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_SUCCESS',
    }));
    expect(sagaTester.getState().orders.list.data).toEqual([
      { id: 500 },
    ]);
  });

  it('calls fetch order list from API on order cancel', () => {
    const sagaTester = getSagaTester({});
    api.fetchParticipantOrders.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 500,
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ORDER_CANCEL_FETCH_SUCCESS' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_SUCCESS',
    }));
    expect(sagaTester.getState().orders.list.data).toEqual([
      { id: 500 },
    ]);
  });

  it('calls fetch order list from API on orders invalidate', () => {
    const sagaTester = getSagaTester({});
    api.fetchParticipantOrders.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 500,
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ORDERS_INVALIDATE' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_SUCCESS',
    }));
    expect(sagaTester.getState().orders.list.data).toEqual([
      { id: 500 },
    ]);
  });

  it('calls fetch order list from API on order confirm', () => {
    const sagaTester = getSagaTester({});
    api.fetchParticipantOrders.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 500,
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ORDER_CONFIRM_FETCH_SUCCESS' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_FETCH_SUCCESS',
    }));
    expect(sagaTester.getState().orders.list.data).toEqual([
      { id: 500 },
    ]);
  });
});
