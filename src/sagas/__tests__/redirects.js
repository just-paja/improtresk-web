import SagaTester from 'redux-saga-tester';

import reducers from '../../reducers';

import * as sagas from '../redirects';

describe('redirect sagas', () => {
  it('redirectHome triggers redirect home', () => {
    const sagaTester = new SagaTester({
      initialState: {},
      reducers,
    });
    sagaTester.start(sagas.redirectHome);
    expect(sagaTester.getCalledActions()).toContainEqual(
      expect.objectContaining({
        payload: {
          method: 'push',
          args: ['/cs/ucastnik'],
        },
      })
    );
    sagaTester.reset();
  });

  it('redirectOrderConfirm triggers redirect to order confirm', () => {
    const sagaTester = new SagaTester({
      initialState: {},
      reducers,
    });
    sagaTester.start(sagas.redirectOrderConfirm);
    expect(sagaTester.getCalledActions()).toContainEqual(
      expect.objectContaining({
        payload: {
          method: 'push',
          args: ['/cs/ucastnik/potvrzeni'],
        },
      })
    );
    sagaTester.reset();
  });
});
