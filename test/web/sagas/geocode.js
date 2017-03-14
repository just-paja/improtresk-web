import { expect } from 'chai';
import { call, fork, select, takeLatest } from 'redux-saga/effects';

import { isStateValid } from '../../../src/web/selectors/common';
import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import {
  getAllAddresses,
  getGeocodeState,
} from '../../../src/web/selectors/geocode';
import {
  fetchMarker,
  fetchAllMarkers,
  geocodeAll,
} from '../../../src/web/sagas/geocode';

import * as api from '../../../src/web/api';

describe('Geocode sagas', () => {
  it('geocodeAll creates fetch actions', () => {
    const saga = geocodeAll();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'WORKSHOP_LOCATIONS_FETCH_SUCCESS',
        'REQUEST_WORKSHOP_LOCATIONS',
      ],
      fetchAllMarkers
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchAllMarkers creates fetch actions with news id', () => {
    const saga = fetchAllMarkers();
    expect(saga.next().value).to.eql(select(getAllAddresses));
    expect(saga.next([
      'Jungmannova 1',
      'Nádražní 42',
      'Nad Na nádraží 100',
    ]).value).to.eql(select(getGeocodeState));
    expect(saga.next({
      'Jungmannova 1': { valid: true },
      'Nádražní 42': { valid: false },
    }).value).to.eql([
      call(fetchMarker, 'Nádražní 42'),
      call(fetchMarker, 'Nad Na nádraží 100'),
    ]);
    expect(saga.next().done).to.equal(true);
  });
  it('fetchMarker creates no action without news id', () => {
    const saga = fetchMarker('foo');
    expect(saga.next().value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchMarker,
      isStateValid,
      {
        onStart: 'GEOCODE_LOCATION_FETCH_STARTED',
        onSuccess: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        onError: 'GEOCODE_LOCATION_FETCH_ERROR',
        address: 'foo',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
});
