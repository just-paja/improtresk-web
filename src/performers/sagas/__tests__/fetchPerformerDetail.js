import sinon from 'sinon';

import { performerDetailFetch } from '../../actions';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('fetchPerformerDetail saga', () => {
  beforeEach(() => {
    sinon.stub(performerDetailFetch, 'resource');
  });

  afterEach(() => {
    performerDetailFetch.resource.restore();
  });

  it('fetches performer list', () => {
    const sagaTester = getSagaTester();
    performerDetailFetch.resource.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 40,
        name: 'Foo',
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(performerDetailFetch());
    expect(sagaTester.numCalled(performerDetailFetch.REQUEST)).toBe(1);
    expect(sagaTester.getState().performers.detail.data).toEqual({
      id: 40,
      name: 'Foo',
    });
  });
});
