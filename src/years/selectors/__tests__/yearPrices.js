import { getPriceLevels } from '..';

describe('Price selectors', () => {
  it('getPriceLevels returns empty array when there is no year', () => {
    expect(getPriceLevels({
      years: {
        list: {
          data: [],
        },
      },
    })).toEqual([]);
  });

  it('getPriceLevels returns empty array when year has no price levels', () => {
    expect(getPriceLevels({
      years: {
        list: {
          data: [
            {
              current: true,
              priceLevels: [],
            },
          ],
        },
      },
    })).toEqual([]);
    expect(getPriceLevels({
      years: {
        list: {
          data: [
            { current: true },
          ],
        },
      },
    })).toEqual([]);
  });

  it('getPriceLevels returns all price levels with ending dates', () => {
    expect(getPriceLevels({
      years: {
        list: {
          data: [
            {
              current: true,
              priceLevels: [
                {
                  id: 3,
                  name: 'Nejlepší',
                  takesEffectOn: '2015-11-02T03:04:05Z',
                },
                {
                  id: 4,
                  name: 'Chybná cenová hladina',
                  takesEffectOn: '2015-11-02T03:04:05Z',
                },
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
      },
    })).toEqual([
      {
        id: 4,
        name: 'Chybná cenová hladina',
        takesEffectOn: '2015-11-02T03:04:05Z',
        endsOn: '2015-11-02T03:04:05Z',
      },
      {
        id: 3,
        name: 'Nejlepší',
        takesEffectOn: '2015-11-02T03:04:05Z',
        endsOn: '2016-01-02T03:04:05Z',
      },
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
