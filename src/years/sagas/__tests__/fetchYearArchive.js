import sinon from 'sinon';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import * as api from '../../../api';

describe('Year Archive sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch year detail when required', () => {
    const sagaTester = getSagaTester({});
    api.fetchArchivedYear.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 5,
        year: '2018',
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'YEAR_DETAIL_REQUIRED',
      year: '2018',
    });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_DETAIL_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_DETAIL_FETCH_SUCCESS',
    }));
    expect(api.fetchArchivedYear.getCall(0).args).toContainEqual(expect.objectContaining({
      year: '2018',
    }));
  });
});
