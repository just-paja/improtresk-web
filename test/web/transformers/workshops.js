import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/workshops';

describe('Workshop transformers', () => {
  it('aggregateWorkshopDifficultyName returns null when difficulties are not available', () => {
    expect(transformers.aggregateWorkshopDifficultyName(1)).to.equal(null);
  });
  it('aggregateWorkshopDifficultyName returns null with unknown difficulty', () => {
    expect(transformers.aggregateWorkshopDifficultyName(1, [
      { id: 2, name: 'foo' },
    ])).to.equal(null);
  });
  it('aggregateWorkshopDifficultyName returns difficulty name', () => {
    expect(transformers.aggregateWorkshopDifficultyName(1, [
      { id: 1, name: 'foo' },
    ])).to.equal('foo');
  });

  it('aggregateWorkshopPriceLevelData returns null when price levels are not available', () => {
    expect(transformers.aggregateWorkshopPriceLevelData()({
      id: 1,
      price: 200,
      price_level: 30,
    })).to.equal(null);
  });
  it('aggregateWorkshopPriceLevelData returns null with unknown price level', () => {
    expect(transformers.aggregateWorkshopPriceLevelData([
      {
        id: 60,
        name: 'Zlevněná cena',
        takesEffectOn: '2017-01-03T15:16:31',
        endsOn: '2017-03-03T00:00:00',
      },
    ])({
      id: 1,
      price: 200,
      price_level: 30,
    })).to.equal(null);
  });
  it('aggregateWorkshopPriceLevelData returns price with price level data', () => {
    expect(transformers.aggregateWorkshopPriceLevelData([
      {
        id: 60,
        name: 'Zlevněná cena',
        takesEffectOn: '2017-01-03T15:16:31',
        endsOn: '2017-03-03T00:00:00',
      },
    ])({
      id: 1,
      price: 200,
      price_level: 60,
    })).to.eql({
      endsOn: '2017-03-03T00:00:00',
      id: 1,
      level: 'Zlevněná cena',
      price: 200,
      takesEffectOn: '2017-01-03T15:16:31',
    });
  });
  it('aggregateWorkshopPriceData returns prices with price level data', () => {
    const priceLevels = [
      {
        id: 60,
        name: 'Zlevněná cena',
        takesEffectOn: '2017-01-03T15:16:31',
        endsOn: '2017-03-03T00:00:00',
      },
    ];
    const prices = [
      {
        id: 1,
        price: 200,
        price_level: 60,
      },
      {
        id: 1,
        price: 200,
        price_level: 60000,
      },
    ];
    expect(transformers.aggregateWorkshopPriceData(prices, priceLevels)).to.eql([
      {
        endsOn: '2017-03-03T00:00:00',
        id: 1,
        level: 'Zlevněná cena',
        price: 200,
        takesEffectOn: '2017-01-03T15:16:31',
      },
    ]);
  });
  it('aggregateWorkshopPriceData returns empty array when price levels are not available', () => {
    const prices = [
      {
        id: 1,
        price: 200,
        price_level: 60,
      },
      {
        id: 1,
        price: 200,
        price_level: 60000,
      },
    ];
    expect(transformers.aggregateWorkshopPriceData(prices)).to.eql([]);
  });
  it('aggregateWorkshopPriceData returns empty array when prices are not available', () => {
    const priceLevels = [
      {
        id: 60,
        name: 'Zlevněná cena',
        takesEffectOn: '2017-01-03T15:16:31',
        endsOn: '2017-03-03T00:00:00',
      },
    ];
    expect(transformers.aggregateWorkshopPriceData(null, priceLevels)).to.eql([]);
  });

  it('returns null when workshop is not available', () => {
    expect(transformers.aggregateWorkshopData()()).to.equal(null);
  });
  it('returns workshop extended with related data with default capacity', () => {
    expect(transformers.aggregateWorkshopData([], [], [], [])(
      {
        id: 5,
        name: 'foo',
        difficulty: 765,
        lectors: [13],
        prices: [
          { id: 5, price: 999 },
        ],
      }
    )).to.eql({
      id: 5,
      name: 'foo',
      capacityStatus: {},
      difficulty: null,
      lectors: [],
      prices: [],
    });
  });
  it('returns workshop extended with related data', () => {
    const capacity = [
      {
        id: 5,
        capacity: 12,
        number_of_reservations: 5,
        number_of_unpaid_reservations: 7,
      },
    ];
    expect(transformers.aggregateWorkshopData([], [], [], [], capacity)(
      {
        id: 5,
        name: 'foo',
        difficulty: 765,
        lectors: [13],
        prices: [
          { id: 5, price: 999 },
        ],
      }
    )).to.eql({
      id: 5,
      name: 'foo',
      capacityStatus: {
        capacity: 12,
        assigned: 5,
        reserved: 7,
        freeSpots: 0,
        fullyAssigned: false,
        fullyReserved: true,
      },
      difficulty: null,
      lectors: [],
      prices: [],
    });
  });
});
