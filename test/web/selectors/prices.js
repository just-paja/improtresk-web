import { expect } from 'chai';

import { getPriceLevels } from '../../../src/web/selectors/prices';

describe('Price selectors', () => {
  it('getPriceLevels returns empty array when there is no year', () => {
    expect(getPriceLevels({
      years: {
        data: [],
      },
    })).to.eql([]);
  });
  it('getPriceLevels returns all price levels with ending dates', () => {
    expect(getPriceLevels({
      years: {
        data: [
          {
            current: true,
            priceLevels: [
              {
                id: 2,
                name: 'Základní',
                takesEffectOn: '2016-03-02T03:04:05Z',
              },
              {
                id: 1,
                name: 'Zlevněná',
                takesEffectOn: '2016-01-02T03:04:05Z',
              },
            ],
          },
        ],
      },
    })).to.eql([
      {
        id: 1,
        name: 'Zlevněná',
        takesEffectOn: '2016-01-02T03:04:05Z',
        endsOn: '2016-03-02T03:04:05Z',
      },
      {
        id: 2,
        name: 'Základní',
        takesEffectOn: '2016-03-02T03:04:05Z',
        endsOn: null,
      },
    ]);
  });
});
