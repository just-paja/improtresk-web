import moment from 'moment-timezone';
import sinon from 'sinon';

import {
  getOrderFormPrice,
  getOrderedMeals,
  getUnconfirmedOrder,
} from '../';

describe('Order selectors', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers(moment('2016-01-02T00:00:00Z').toDate());
  });

  afterEach(() => {
    clock.restore();
  });

  it('getUnconfirmedOrder returns order that is not confirmed, not paid and not canceled', () => {
    expect(getUnconfirmedOrder({
      accomodation: {
        list: {
          data: [],
        },
      },
      food: {
        list: {
          data: [
            {
              id: 5,
              price: 90,
            },
            {
              id: 6,
              price: 110,
            },
          ],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 100,
              confirmed: false,
              paid: false,
              canceled: false,
            },
          ],
        },
      },
    })).toEqual({
      accomodation: null,
      canceled: false,
      confirmed: false,
      id: 100,
      meals: [],
      paid: false,
      workshop: null,
    });
  });

  it('getUnconfirmedOrder ignores orders that are confirmed, not paid and not canceled', () => {
    expect(getUnconfirmedOrder({
      accomodation: {
        list: {
          data: [],
        },
      },
      food: {
        list: {
          data: [
            {
              id: 5,
              price: 90,
            },
            {
              id: 6,
              price: 110,
            },
          ],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 100,
              confirmed: true,
              paid: false,
              canceled: false,
            },
          ],
        },
      },
    })).toEqual(null);
  });

  it('getUnconfirmedOrder ignores orders that are not confirmed, paid and not canceled', () => {
    expect(getUnconfirmedOrder({
      accomodation: {
        list: {
          data: [],
        },
      },
      food: {
        list: {
          data: [
            {
              id: 5,
              price: 90,
            },
            {
              id: 6,
              price: 110,
            },
          ],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 100,
              confirmed: false,
              paid: true,
              canceled: false,
            },
          ],
        },
      },
    })).toEqual(null);
  });

  it('getUnconfirmedOrder ignores orders that are not confirmed, not paid and canceled', () => {
    expect(getUnconfirmedOrder({
      accomodation: {
        list: {
          data: [],
        },
      },
      food: {
        list: {
          data: [
            {
              id: 5,
              price: 90,
            },
            {
              id: 6,
              price: 110,
            },
          ],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 100,
              confirmed: false,
              paid: false,
              canceled: true,
            },
          ],
        },
      },
    })).toEqual(null);
  });

  it('getOrderFormPrice returns zero price with expired workshop', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {
            workshop: 17,
          },
        },
      },
      food: {
        list: {
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
              id: 17,
              lectors: [],
              prices: [
                {
                  id: 10,
                  price: 200,
                  price_level: 1,
                },
                {
                  id: 10,
                  price: 400,
                  price_level: 2,
                },
              ],
            },
          ],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
    })).toBe(0);
  });

  it('getOrderFormPrice returns zero price with no workshop', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {},
        },
      },
      food: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
    })).toBe(0);
  });

  it('getOrderFormPrice returns zero price with unknown workshop', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {
            workshop: 19,
          },
        },
      },
      food: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
    })).toBe(0);
  });

  it('getOrderFormPrice returns zero price with empty meals', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {
            meals: [],
          },
        },
      },
      food: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
    })).toBe(0);
  });

  it('getOrderFormPrice returns zero price with unknown meals', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {
            meals: [5, 9],
          },
        },
      },
      food: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
    })).toBe(0);
  });

  it('getOrderFormPrice returns price with meals', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {
            meals: [5, 6],
          },
        },
      },
      food: {
        list: {
          data: [
            {
              id: 5,
              price: 90,
            },
            {
              id: 6,
              price: 110,
            },
          ],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [],
            },
          ],
        },
      },
    })).toBe(200);
  });

  it('getOrderFormPrice returns unexpired workshop price', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {
            workshop: 17,
          },
        },
      },

      food: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        list: {
          data: [
            {
              id: 17,
              lectors: [],
              prices: [
                {
                  id: 10,
                  price: 200,
                  price_level: 1,
                },
                {
                  id: 10,
                  price: 400,
                  price_level: 2,
                },
              ],
            },
          ],
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 1,
              current: true,
              year: '2016',
              priceLevels: [
                {
                  id: 1,
                  name: 'Zlevněná cena',
                  takesEffectOn: '2016-01-01T00:00:00Z',
                },
                {
                  id: 2,
                  name: 'Základní cena',
                  takesEffectOn: '2016-01-02T00:00:00Z',
                },
              ],
            },
          ],
        },
      },
    })).toBe(400);
  });

  it('getOrderedMeals returns empty array without order', () => {
    expect(getOrderedMeals({
      food: {
        list: {
          data: [
            {
              id: 1,
              name: 'lunch',
              date: '2016-04-03',
              foods: [
                { id: 1 },
                { id: 2 },
              ],
              soup: [
                { id: 100 },
                { id: 200 },
              ],
            },
            {
              id: 2,
              name: 'lunch',
              date: '2016-04-03',
              foods: [
                { id: 3 },
                { id: 4 },
              ],
              soup: [
                { id: 300 },
                { id: 400 },
              ],
            },
          ],
        },
      },
      accomodation: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [],
        },
      },
    })).toEqual([]);
  });

  it('getOrderedMeals returns meals with groupped food', () => {
    expect(getOrderedMeals({
      food: {
        list: {
          data: [
            {
              id: 1,
              name: 'lunch',
              date: '2016-04-03',
              food: [
                { id: 1 },
                { id: 2 },
              ],
              soups: [
                { id: 100 },
                { id: 200 },
              ],
            },
            {
              id: 2,
              name: 'lunch',
              date: '2016-04-03',
              food: [
                { id: 3 },
                { id: 4 },
              ],
              soups: [
                { id: 300 },
                { id: 400 },
              ],
            },
          ],
        },
      },
      accomodation: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 10,
              reservation: {
                id: 17,
                mealReservation: [
                  {
                    id: 90,
                    meal: 1,
                    food: 1,
                    soup: 200,
                  },
                  {
                    id: 90,
                    meal: 2,
                    food: 4,
                    soup: 400,
                  },
                ],
              },
            },
          ],
        },
      },
    })).toEqual([
      {
        id: 1,
        name: 'lunch',
        date: '2016-04-03',
        orderedFood: { id: 1 },
        orderedSoup: { id: 200 },
        food: [
          { id: 1 },
          { id: 2 },
        ],
        soups: [
          { id: 100 },
          { id: 200 },
        ],
      },
      {
        id: 2,
        name: 'lunch',
        date: '2016-04-03',
        orderedFood: { id: 4 },
        orderedSoup: { id: 400 },
        food: [
          { id: 3 },
          { id: 4 },
        ],
        soups: [
          { id: 300 },
          { id: 400 },
        ],
      },
    ]);
  });

  it('getOrderedMeals returns strips away unknown foods', () => {
    expect(getOrderedMeals({
      food: {
        list: {
          data: [
            {
              id: 1,
              name: 'lunch',
              date: '2016-04-03',
              food: [
                { id: 1 },
                { id: 2 },
              ],
              soups: [
                { id: 100 },
                { id: 200 },
              ],
            },
          ],
        },
      },
      accomodation: {
        list: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
      },
      years: {
        capacity: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 10,
              reservation: {
                id: 17,
                mealReservation: [
                  {
                    id: 90,
                    meal: 1,
                    food: 1,
                    soup: 200,
                  },
                  {
                    id: 90,
                    meal: 2,
                    food: 4,
                    soup: 400,
                  },
                ],
              },
            },
          ],
        },
      },
    })).toEqual([
      {
        id: 1,
        name: 'lunch',
        date: '2016-04-03',
        orderedFood: { id: 1 },
        orderedSoup: { id: 200 },
        food: [
          { id: 1 },
          { id: 2 },
        ],
        soups: [
          { id: 100 },
          { id: 200 },
        ],
      },
    ]);
  });
});
