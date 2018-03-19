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
});
