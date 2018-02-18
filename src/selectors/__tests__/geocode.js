import {
  getAllAddresses,
  isReady,
} from '../geocode';

describe('Geocode selectors', () => {
  it('getAllAddresses returns all available addresses', () => {
    expect(getAllAddresses({
      geocode: {
        foo: {},
        bar: null,
      },
    })).toEqual(['foo', 'bar']);
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
    })).toBe(true);
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
    })).toBe(false);
  });
});
