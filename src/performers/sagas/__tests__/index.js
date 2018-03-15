import sinon from 'sinon';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import * as api from '../../../api';

describe('Performers sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch participant list when required', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 5,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchPerformers.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 2,
          name: '20000 židů pod mořem',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'PERFORMERS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'PERFORMERS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'PERFORMERS_FETCH_SUCCESS',
    }));
    expect(sagaTester.getState().performers.list.data).toMatchObject([
      {
        id: 2,
        name: '20000 židů pod mořem',
      },
    ]);
  });

  it('do not fetch participant list when no year is active', () => {
    const sagaTester = getSagaTester({});
    api.fetchPerformers.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 2,
          name: '20000 židů pod mořem',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'PERFORMERS_REQUIRED' });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'PERFORMERS_FETCH_STARTED',
    }));
  });

  it('fetch participant detail when required', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 5,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchPerformerDetail.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 2,
        name: '20000 židů pod mořem',
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'PERFORMER_DETAIL_REQUIRED', slug: '2000-k-zidu-200' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'PERFORMER_DETAIL_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'PERFORMER_DETAIL_FETCH_SUCCESS',
    }));
    expect(sagaTester.getState().performers.detail).toMatchObject({
      id: '2000-k-zidu-200',
      data: {
        id: 2,
        name: '20000 židů pod mořem',
      },
    });
  });

  it('do not fetch participant detail when no year is active', () => {
    const sagaTester = getSagaTester({});
    api.fetchPerformerDetail.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 2,
        name: '20000 židů pod mořem',
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'PERFORMER_DETAIL_REQUIRED', slug: '2000-k-zidu-200' });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'PERFORMER_DETAIL_FETCH_STARTED',
    }));
  });
});
