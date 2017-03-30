import { expect } from 'chai';

import {
  getAllAddresses,
  isReady,
} from '../../../src/web/selectors/geocode';

describe('Geocode selectors', () => {
  it('getAllAddresses returns all available addresses', () => {
    expect(getAllAddresses({
      geocode: {
        foo: {},
        bar: null,
      },
    })).to.eql(['foo', 'bar']);
  });
  it('isReady returns true when all addresses are ready', () => {
    expect(isReady({
      geocode: {
        foo: {
          ready: true,
        },
        bar: {
          ready: true,
        },
      },
    })).to.equal(true);
  });
  it('isReady returns false when not all addresses are ready', () => {
    expect(isReady({
      geocode: {
        foo: {
          ready: true,
        },
        zap: null,
        bar: {
          ready: false,
        },
      },
    })).to.equal(false);
  });
});
