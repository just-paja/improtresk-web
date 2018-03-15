import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Workshop Lector sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch lector roles from API', () => {
    const sagaTester = getSagaTester({});
    api.fetchLectorRoles.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Hlavní lektor',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'LECTOR_ROLES_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'LECTOR_ROLES_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'LECTOR_ROLES_FETCH_SUCCESS',
    }));
    expect(api.fetchLectorRoles.calledOnce).toBeTruthy();
    expect(sagaTester.getState().workshops.lectors.roles.data).toMatchObject([
      {
        id: 3,
        name: 'Hlavní lektor',
      },
    ]);
  });

  it('fetch lector list from API', () => {
    const sagaTester = getSagaTester({});
    api.fetchLectors.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Hlavní lektor',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'LECTORS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'LECTORS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'LECTORS_FETCH_SUCCESS',
    }));
    expect(api.fetchLectors.calledOnce).toBeTruthy();
    expect(sagaTester.getState().workshops.lectors.list.data).toMatchObject([
      {
        id: 3,
        name: 'Hlavní lektor',
      },
    ]);
  });
});
