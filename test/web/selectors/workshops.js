import { expect } from 'chai';

import {
  getAddresses,
  getLocationMarkers,
  getLocations,
  getWorkshopDetailId,
  shouldFetchDetail,
  shouldFetchDifficulties,
  shouldFetchList,
  shouldFetchLocations,
  workshopsAll,
  workshopsDetail,
} from '../../../src/web/selectors/workshops';

describe('Workshops selectors', () => {
  it('workshopsAll returns all workshops stored', () => {
    expect(workshopsAll({
      capacity: {},
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [
            {
              id: 1,
              lectors: [],
              prices: [],
            },
          ],
        },
      },
      years: {
        data: [],
      },
    })).to.eql([
      {
        id: 1,
        difficulty: null,
        lectors: [],
        prices: [],
      },
    ]);
  });
  it('workshopsAll returns all workshops with price levels mapped', () => {
    expect(workshopsAll({
      capacity: {},
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [
            {
              id: 1,
              lectors: [],
              prices: [
                {
                  id: 4,
                  price_level: 1,
                  price: 200,
                },
                {
                  id: 6,
                  price_level: 2,
                  price: 400,
                },
              ],
            },
          ],
        },
      },
      years: {
        data: [
          {
            year: '2016',
            current: true,
            priceLevels: [
              {
                id: 1,
                name: 'Zlevněná',
                takesEffectOn: '2016-01-02T03:04:05Z',
              },
              {
                id: 2,
                name: 'Základní',
                takesEffectOn: '2016-03-02T03:04:05Z',
              },
            ],
          },
        ],
      },
    })).to.eql([
      {
        id: 1,
        difficulty: null,
        lectors: [],
        prices: [
          {
            id: 4,
            endsOn: '2016-03-02T03:04:05Z',
            level: 'Zlevněná',
            price: 200,
            takesEffectOn: '2016-01-02T03:04:05Z',
          },
          {
            id: 6,
            endsOn: null,
            level: 'Základní',
            price: 400,
            takesEffectOn: '2016-03-02T03:04:05Z',
          },
        ],
      },
    ]);
  });
  it('workshopsAll returns all workshops with difficulty mapped', () => {
    expect(workshopsAll({
      capacity: {},
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [
            {
              id: 2,
              name: 'Pro začátečníky',
            },
          ],
        },
        list: {
          data: [
            {
              id: 1,
              difficulty: 2,
              lectors: [],
              prices: [],
            },
          ],
        },
      },
      years: {
        data: [
          {
            year: '2016',
            current: true,
            priceLevels: [],
          },
        ],
      },
    })).to.eql([
      {
        id: 1,
        difficulty: 'Pro začátečníky',
        lectors: [],
        prices: [],
      },
    ]);
  });
  it('workshopsAll returns all workshops with lectors mapped', () => {
    expect(workshopsAll({
      capacity: {},
      lectors: {
        list: {
          data: [
            {
              id: 1,
              name: 'Jana Machalíková',
            },
          ],
        },
        roles: {
          data: [
            {
              id: 1,
              name: 'Hlavní lektor',
            },
          ],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [
            {
              id: 1,
              lectors: [
                { id: 1, lector: 1, role: 1 },
              ],
              prices: [],
            },
          ],
        },
      },
      years: {
        data: [
          {
            year: '2016',
            current: true,
            priceLevels: [],
          },
        ],
      },
    })).to.eql([
      {
        id: 1,
        difficulty: null,
        lectors: [
          {
            id: 1,
            lector: {
              id: 1,
              name: 'Jana Machalíková',
            },
            role: 'Hlavní lektor',
          },
        ],
        prices: [],
      },
    ]);
  });
  it('workshopsAll returns all workshops without prices when levels are not available', () => {
    expect(workshopsAll({
      capacity: {},
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [
            {
              id: 1,
              lectors: [],
              prices: [
                {
                  price_level: 1,
                  price: 200,
                },
                {
                  price_level: 2,
                  price: 400,
                },
              ],
            },
          ],
        },
      },
      years: {
        data: [
          {
            year: '2016',
            current: true,
          },
        ],
      },
    })).to.eql([
      {
        id: 1,
        difficulty: null,
        lectors: [],
        prices: [],
      },
    ]);
  });
  it('workshopsAll returns all workshops without difficulties when not available', () => {
    expect(workshopsAll({
      capacity: {},
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [
            {
              id: 1,
              difficulty: 32,
              lectors: [],
              prices: [],
            },
          ],
        },
      },
      years: {
        data: [
          {
            year: '2016',
            current: true,
          },
        ],
      },
    })).to.eql([
      {
        id: 1,
        difficulty: null,
        lectors: [],
        prices: [],
      },
    ]);
  });
  it('workshopsDetail returns detail of the stored workshop', () => {
    expect(workshopsDetail({
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        detail: {
          data: {
            id: 1,
            name: 'foo',
            lectors: [],
            prices: [],
          },
        },
        difficulties: {
          data: [],
        },
      },
      years: {
        data: [],
      },
    })).to.eql({
      id: 1,
      difficulty: null,
      name: 'foo',
      lectors: [],
      prices: [],
    });
  });
  it('workshopsDetail returns null when not available', () => {
    expect(workshopsDetail({
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        detail: {
          data: null,
        },
        difficulties: {
          data: [],
        },
      },
      years: {
        data: [],
      },
    })).to.eql(null);
  });
  it('getWorkshopDetailId returns id of displayed workshop', () => {
    expect(getWorkshopDetailId({
      workshops: {
        detail: {
          id: 53,
        },
      },
    })).to.equal(53);
  });
  it('getAddresses returns list of all workshop location addresses', () => {
    expect(getAddresses({
      workshops: {
        locations: {
          data: [
            {
              id: 1,
              address: 'Nádražní 14',
            },
            {
              id: 2,
              address: 'Pražská 1',
            },
          ],
        },
      },
    })).to.eql([
      'Nádražní 14',
      'Pražská 1',
    ]);
  });
  it('getLocations returns list of all locations', () => {
    expect(getLocations({
      workshops: {
        locations: {
          data: [
            {
              id: 1,
              address: 'Nádražní 14',
            },
          ],
        },
      },
    })).to.eql([
      {
        id: 1,
        address: 'Nádražní 14',
      },
    ]);
  });
  it('getLocationMarkers returns list of all geocoded locations', () => {
    expect(getLocationMarkers({
      geocode: {
        'Nádražní 1': {
          valid: true,
          data: { lat: 'foo', lng: 'bar' },
        },
        'Hradecká 42': {
          valid: false,
        },
      },
      workshops: {
        locations: {
          data: [
            {
              id: 1,
              address: 'Nádražní 1',
            },
            {
              id: 2,
              address: 'Pražská 9',
            },
            {
              id: 3,
              address: 'Hradecká 42',
            },
          ],
        },
      },
    })).to.eql([
      {
        id: 1,
        address: 'Nádražní 1',
        lat: 'foo',
        lng: 'bar',
      },
    ]);
  });
  it('shouldFetchList returns false when in invalid state', () => {
    expect(shouldFetchList({ workshops: { } })).to.equal(false);
    expect(shouldFetchList({ workshops: { list: {} } })).to.equal(false);
    expect(shouldFetchList({ workshops: { list: { valid: false } } })).to.equal(false);
  });
  it('shouldFetchList returns true when in valid state', () => {
    expect(shouldFetchList({ workshops: { list: { valid: true } } })).to.equal(true);
  });
  it('shouldFetchDetail returns false when in invalid state', () => {
    expect(shouldFetchDetail({ workshops: { } })).to.equal(false);
    expect(shouldFetchDetail({ workshops: { detail: {} } })).to.equal(false);
    expect(shouldFetchDetail({ workshops: { detail: { valid: false } } })).to.equal(false);
  });
  it('shouldFetchDetail returns true when in valid state', () => {
    expect(shouldFetchDetail({
      workshops: {
        detail: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).to.equal(true);
  });
  it('shouldFetchDifficulties returns false when in invalid state', () => {
    expect(shouldFetchDifficulties({ workshops: { } })).to.equal(false);
    expect(shouldFetchDifficulties({ workshops: { difficulties: {} } })).to.equal(false);
    expect(shouldFetchDifficulties({
      workshops: { difficulties: { valid: false } },
    })).to.equal(false);
  });
  it('shouldFetchDifficulties returns true when in valid state', () => {
    expect(shouldFetchDifficulties({
      workshops: {
        difficulties: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).to.equal(true);
  });
  it('shouldFetchLocations returns false when in invalid state', () => {
    expect(shouldFetchLocations({ workshops: { } })).to.equal(false);
    expect(shouldFetchLocations({ workshops: { locations: {} } })).to.equal(false);
    expect(shouldFetchLocations({
      workshops: { locations: { valid: false } },
    })).to.equal(false);
  });
  it('shouldFetchLocations returns true when in valid state', () => {
    expect(shouldFetchLocations({
      workshops: {
        locations: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).to.equal(true);
  });
});
