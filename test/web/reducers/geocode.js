import { expect } from 'chai';

import geocode from '../../../src/web/reducers/geocode';

describe('Geocode reducer', () => {
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
  it('returns state marked as loaded', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
        data: {
          lat: 5.234,
          lng: 2.234,
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
});
