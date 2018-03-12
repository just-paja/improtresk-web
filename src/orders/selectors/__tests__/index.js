import moment from 'moment-timezone';
import sinon from 'sinon';

import {
  getActiveOrder,
  getOrderFormPrice,
  getOrderList,
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

  it('getUnconfirmedOrder returns order that is not confirmed, not paid and not cancelled', () => {
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
      participants: {
        detail: {},
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
              cancelled: false,
            },
          ],
        },
      },
    })).toEqual({
      assigned: false,
      accomodation: null,
      cancelled: false,
      confirmed: false,
      id: 100,
      meals: [],
      paid: false,
      workshop: null,
      year: null,
    });
  });

  it('getUnconfirmedOrder ignores orders that are confirmed, not paid and not cancelled', () => {
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
      participants: {
        detail: {},
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
              cancelled: false,
            },
          ],
        },
      },
    })).toEqual(null);
  });

  it('getUnconfirmedOrder ignores orders that are not confirmed, paid and not cancelled', () => {
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
      participants: {
        detail: {},
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
              cancelled: false,
            },
          ],
        },
      },
    })).toEqual(null);
  });

  it('getUnconfirmedOrder ignores orders that are not confirmed, not paid and cancelled', () => {
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
      participants: {
        detail: {},
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
              cancelled: true,
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
      participants: {
        detail: {},
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
      participants: {
        detail: {},
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
      participants: {
        detail: {},
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
      participants: {
        detail: {},
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
      participants: {
        detail: {},
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
      participants: {
        detail: {},
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
      participants: {
        detail: {},
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
          data: [
            {
              id: 4,
              year: '2018',
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 10,
              year: 4,
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
      participants: {
        detail: {},
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
          data: [
            {
              id: 4,
              year: '2018',
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 10,
              year: 4,
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
      participants: {
        detail: {},
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

  it('getOrderList returns empty array when no orders are present', () => {
    expect(getOrderList({
      accomodation: {
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [],
        },
      },
      participants: {
        detail: {},
      },
      food: {
        list: {
          data: [],
        },
      },
      workshops: {
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        list: {
          data: [],
        },
      },
      years: {
        list: {
          data: [],
        },
        capacity: {
          data: {},
        },
      },
    })).toEqual([]);
  });

  it('getOrderList returns array of orders sorted by date created', () => {
    expect(getOrderList({
      accomodation: {
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 15,
              createdAt: '2017-12-12',
            },
            {
              id: 16,
              createdAt: '2017-12-12',
            },
            {
              id: 19,
              createdAt: '2017-01-12',
            },
            {
              id: 20,
              createdAt: '2017-12-13',
            },
          ],
        },
      },
      participants: {
        detail: {},
      },
      food: {
        list: {
          data: [],
        },
      },
      workshops: {
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        list: {
          data: [],
        },
      },
      years: {
        list: {
          data: [],
        },
        capacity: {
          data: {},
        },
      },
    })).toEqual([
      {
        accomodation: null,
        assigned: false,
        id: 20,
        createdAt: '2017-12-13',
        meals: [],
        workshop: null,
        year: null,
      },
      {
        accomodation: null,
        assigned: false,
        id: 15,
        createdAt: '2017-12-12',
        meals: [],
        workshop: null,
        year: null,
      },
      {
        accomodation: null,
        assigned: false,
        id: 16,
        createdAt: '2017-12-12',
        meals: [],
        workshop: null,
        year: null,
      },
      {
        accomodation: null,
        assigned: false,
        id: 19,
        createdAt: '2017-01-12',
        meals: [],
        workshop: null,
        year: null,
      },
    ]);
  });

  it('getActiveOrder returns null when there is no year', () => {
    expect(getActiveOrder({
      accomodation: {
        list: {
          data: [],
        },
      },
      food: {
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [],
        },
      },
      participants: {
        detail: {},
      },
      workshops: {
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        list: {
          data: [],
        },
      },
      years: {
        list: {
          data: [],
        },
        capacity: {},
      },
    })).toBe(null);
  });

  it('getActiveOrder returns null when there are only cancelled orders', () => {
    expect(getActiveOrder({
      accomodation: {
        list: {
          data: [],
        },
      },
      food: {
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 5,
              year: 8,
              cancelled: true,
            },
          ],
        },
      },
      participants: {
        detail: {},
      },
      workshops: {
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        list: {
          data: [],
        },
      },
      years: {
        list: {
          data: [
            {
              id: 8,
              year: '2018',
              current: true,
            },
          ],
        },
        capacity: {},
      },
    })).toBe(null);
  });

  it('getActiveOrder latest order with aggregated data', () => {
    expect(getActiveOrder({
      accomodation: {
        list: {
          data: [
            {
              id: 130,
              name: 'Hotel',
            },
          ],
        },
      },
      food: {
        list: {
          data: [
            {
              id: 130,
              date: '2018-10-10',
              year: 8,
            },
            {
              id: 131,
              date: '2018-10-11',
              year: 8,
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 5,
              year: 8,
              reservation: {
                accomodation: 130,
                mealReservation: [
                  {
                    id: 231,
                    meal: 130,
                  },
                  {
                    id: 232,
                    meal: 131,
                  },
                ],
                workshopPrice: {
                  id: 60,
                  price_level: 8,
                  workshop: 13,
                },
              },
            },
          ],
        },
      },
      participants: {
        detail: {},
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
              id: 13,
              name: 'Longforms',
              lectors: [],
            },
          ],
        },
      },
      years: {
        list: {
          data: [
            {
              id: 8,
              year: '2017',
            },
          ],
        },
        capacity: {},
      },
    })).toEqual({
      assigned: false,
      id: 5,
      accomodation: {
        capacityStatus: {},
        id: 130,
        name: 'Hotel',
      },
      year: {
        id: 8,
        year: '2017',
      },
      workshop: {
        capacityStatus: {},
        difficulty: null,
        id: 13,
        lectors: [],
        name: 'Longforms',
        prices: [],
      },
      meals: [
        {
          id: 130,
          date: '2018-10-10',
          year: 8,
        },
        {
          id: 131,
          date: '2018-10-11',
          year: 8,
        },
      ],
      reservation: {
        accomodation: 130,
        mealReservation: [
          {
            meal: 130,
            id: 231,
          },
          {
            meal: 131,
            id: 232,
          },
        ],
        workshopPrice: {
          id: 60,
          price_level: 8,
          workshop: 13,
        },
      },
    });
  });
});
