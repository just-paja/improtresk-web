import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Accomodation sagas', () => {
  beforeEach(() => {
    sinon.stub(api, 'fetchAccomodation');
  });

  afterEach(() => {
    api.fetchAccomodation.restore();
  });

  it('fetch accomodation from API', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 200,
              year: '2017',
              current: true,
            },
          ],
        },
      },
    });
    api.fetchAccomodation.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 20,
          name: 'DK Milevsko',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ACCOMODATION_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ACCOMODATION_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'ACCOMODATION_FETCH_SUCCESS',
    }));
    expect(sagaTester.getState().accomodation.list.data).toEqual([
      {
        id: 20,
        name: 'DK Milevsko',
      },
    ]);
  });

  it('dispatch capacity poll on accomodation required', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 200,
              year: '2017',
              current: true,
            },
          ],
        },
      },
    });
    api.fetchAccomodation.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 20,
          name: 'DK Milevsko',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ACCOMODATION_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_REQUIRED',
    }));
  });

  it('dispatch capacity poll on accomdation exit', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'ACCOMODATION_LEFT' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_STOP',
    }));
  });
});
