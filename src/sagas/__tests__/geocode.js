import { all, call, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from '../api';
import {
  getAllAddresses,
  getGeocodeState,
  isGeocodeRequired,
} from '../../selectors';
import {
  fetchMarker,
  fetchAllMarkers,
  requireGeocode,
} from '../geocode';

import * as api from '../../api';

describe('Geocode sagas', () => {
  it('requireGeocode creates fetch actions', () => {
    const saga = requireGeocode();
    expect(saga.next().value).toEqual(takeLatest(
      [
        'WORKSHOP_LOCATIONS_FETCH_SUCCESS',
        'WORKSHOP_LOCATIONS_REQUIRED',
      ],
      fetchAllMarkers
    ));
    expect(saga.next().done).toBe(true);
  });

  it('fetchAllMarkers creates fetch actions with news id', () => {
    const saga = fetchAllMarkers();
    expect(saga.next().value).toEqual(select(getAllAddresses));
    expect(saga.next([
      'Jungmannova 1',
      'Nádražní 42',
      'Nad Na nádraží 100',
    ]).value).toEqual(select(getGeocodeState));
    expect(saga.next({
      'Jungmannova 1': { valid: true },
      'Nádražní 42': { valid: false },
    }).value).toEqual(all([
      call(fetchMarker, 'Nádražní 42'),
      call(fetchMarker, 'Nad Na nádraží 100'),
    ]));
    expect(saga.next().done).toBe(true);
  });

  it('fetchMarker creates no action without news id', () => {
    const saga = fetchMarker('foo');
    expect(saga.next().value).toEqual(call(
      fetchResource,
      api.fetchMarker,
      {
        isRequired: isGeocodeRequired,
        actions: {
          start: 'GEOCODE_LOCATION_FETCH_STARTED',
          success: 'GEOCODE_LOCATION_FETCH_SUCCESS',
          fail: 'GEOCODE_LOCATION_FETCH_ERROR',
        },
        params: {
          address: 'foo',
        },
        actionData: {
          address: 'foo',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });
});
