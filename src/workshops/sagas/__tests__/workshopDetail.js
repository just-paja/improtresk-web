import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Workshop Detail sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch workshop detail from API', () => {
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
    api.fetchWorkshopDetail.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 3,
        name: 'Super workshop',
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'WORKSHOP_DETAIL_REQUIRED',
      slug: 'nehraj-2231',
    });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DETAIL_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DETAIL_FETCH_SUCCESS',
    }));
    expect(api.fetchWorkshopDetail.getCall(0).args).toContainEqual(expect.objectContaining({
      year: '2018',
      workshop: 'nehraj-2231',
    }));
    expect(sagaTester.getState().workshops.detail.data).toMatchObject({
      id: 3,
      name: 'Super workshop',
    });
  });

  it('start capacity polling when workshop detail is required', () => {
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
    api.fetchWorkshopDetail.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 3,
        name: 'Super workshop',
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'WORKSHOP_DETAIL_REQUIRED',
      slug: 'nehraj-2231',
    });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_REQUIRED',
    }));
  });

  it('do not fetch workshop detail from API when no year is active', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'WORKSHOP_DETAIL_REQUIRED',
      workshop: 'nehraj-2231',
    });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DETAIL_FETCH_STARTED',
    }));
    expect(api.fetchWorkshopDetail.called).toBeFalsy();
  });

  it('stop capacity polling on workshop list exit', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'WORKSHOP_DETAIL_LEFT' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_STOP',
    }));
  });
});
