import { expect } from 'chai';

import {
  workshopsAll,
  workshopsDetail,
  shouldFetchList,
  shouldFetchDetail,
} from '../../../src/web/selectors/workshops';

describe('Workshops selectors', () => {
  it('workshopsAll returns all workshops stored', () => {
    expect(workshopsAll({
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
  it('workshopsAll returns all workshops stored with price levels mapped', () => {
    expect(workshopsAll({
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
            endsOn: '2016-03-02T03:04:05Z',
            level: 'Zlevněná',
            price: 200,
            takesEffectOn: '2016-01-02T03:04:05Z',
          },
          {
            endsOn: null,
            level: 'Základní',
            price: 400,
            takesEffectOn: '2016-03-02T03:04:05Z',
          },
        ],
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
});
