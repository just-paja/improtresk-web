import sinon from 'sinon';

import { orderListFetch } from '../../actions';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

describe('fetchOrders saga', () => {
  beforeEach(() => {
    sinon.stub(orderListFetch, 'resource');
  });

  afterEach(() => {
    orderListFetch.resource.restore();
  });

  it('calls fetch order list from API when required', () => {
    const sagaTester = getSagaTester({});
    orderListFetch.resource.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 500,
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(orderListFetch());
    expect(sagaTester.numCalled(orderListFetch.REQUEST)).toBe(1);
    expect(sagaTester.numCalled(orderListFetch.SUCCESS)).toBe(1);
    expect(sagaTester.getState().orders.list.data).toEqual([
      { id: 500 },
    ]);
  });

  it('calls fetch order list from API on orders invalidate', () => {
    const sagaTester = getSagaTester({});
    orderListFetch.resource.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 500,
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(orderListFetch.invalidate());
    expect(sagaTester.numCalled(orderListFetch.REQUEST)).toBe(1);
    expect(sagaTester.numCalled(orderListFetch.SUCCESS)).toBe(1);
    expect(sagaTester.getState().orders.list.data).toEqual([
      { id: 500 },
    ]);
  });
});
