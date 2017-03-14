import { expect } from 'chai';

import geocode from '../../../src/web/reducers/geocode';

describe('Geocode reducer', () => {
  it('updates locations list', () => {
    expect(geocode(
      {},
      {
        type: 'WORKSHOP_LOCATIONS_FETCH_SUCCESS',
        data: [
          { address: 'foo' },
          { address: 'bar' },
        ],
      }
    )).to.eql({
      bar: { data: null },
      foo: { data: null },
    });
  });
  it('returns default state', () => {
    expect(geocode()).to.eql({});
  });
  it('returns state marked as loading', () => {
    expect(geocode(
      {},
      { type: 'GEOCODE_LOCATION_FETCH_STARTED', address: 'foo' }
    )).to.eql({
      foo: {
        loading: true,
      },
    });
  });
  it('saves address location', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
        data: {
          results: [
            {
              geometry: {
                location: {
                  lat: 5.234,
                  lng: 2.234,
                },
              },
            },
          ],
        },
      }
    )).to.eql({
      foo: {
        loading: false,
        ready: true,
        valid: true,
        data: {
          lat: 5.234,
          lng: 2.234,
        },
      },
    });
  });
  it('saves null for address when results are empty', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
        data: { results: [] },
      }
    )).to.eql({
      foo: {
        loading: false,
        ready: true,
        valid: true,
        data: null,
      },
    });
  });
  it('saves null for address when results are missing', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
        data: {},
      }
    )).to.eql({
      foo: {
        loading: false,
        ready: true,
        valid: true,
        data: null,
      },
    });
  });
  it('saves null for address when data are missing', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
      }
    )).to.eql({
      foo: {
        loading: false,
        ready: true,
        valid: true,
        data: null,
      },
    });
  });
  it('saves geocode error', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_ERROR',
        address: 'foo',
        error: 'bar',
      }
    )).to.eql({
      foo: {
        error: 'bar',
        loading: false,
        ready: true,
      },
    });
  });
});
