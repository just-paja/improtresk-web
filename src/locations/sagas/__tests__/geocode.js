import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Location Geocode sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch markers geocode coordinates', () => {
    const sagaTester = getSagaTester({
      locations: {
        geocode: {
          'Jungmannova 1': {},
          'Nádražní 42': {},
        },
      },
    });
    api.fetchMarker.onCall(0).returns({
      ok: true,
      status: 200,
      json: () => ({
        results: [
          {
            geometry: {
              location: {
                lat: 15,
                lng: 16,
              },
            },
          },
        ],
      }),
    });
    api.fetchMarker.onCall(1).returns({
      ok: true,
      status: 200,
      json: () => ({
        results: [
          {
            geometry: {
              location: {
                lat: 16,
                lng: 17,
              },
            },
          },
        ],
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'LOCATIONS_REQUIRED' });
    expect(sagaTester.numCalled('GEOCODE_LOCATION_FETCH_STARTED')).toBe(2);
    expect(sagaTester.numCalled('GEOCODE_LOCATION_FETCH_SUCCESS')).toBe(2);
    expect(sagaTester.getState().locations.geocode).toMatchObject({
      'Jungmannova 1': {
        data: {
          lat: 15,
          lng: 16,
        },
      },
      'Nádražní 42': {
        data: {
          lat: 16,
          lng: 17,
        },
      },
    });
  });
});
