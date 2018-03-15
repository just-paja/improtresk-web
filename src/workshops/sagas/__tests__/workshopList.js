import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Workshop List sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch workshop list from API', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 15,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchWorkshops.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Super workshop',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'WORKSHOPS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_FETCH_SUCCESS',
    }));
    expect(api.fetchWorkshops.getCall(0).args).toContainEqual(expect.objectContaining({
      year: '2018',
    }));
    expect(sagaTester.getState().workshops.list.data).toMatchObject([
      {
        id: 3,
        name: 'Super workshop',
      },
    ]);
  });

  it('start capacity polling when workshop list is required', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 15,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchWorkshops.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Super workshop',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'WORKSHOPS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_REQUIRED',
    }));
  });

  it('do not fetch workshop list from API when no year is active', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'WORKSHOPS_REQUIRED' });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_FETCH_STARTED',
    }));
    expect(api.fetchWorkshops.called).toBeFalsy();
  });

  it('stop capacity polling on workshop list exit', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'WORKSHOPS_LEFT' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_STOP',
    }));
  });
});
