import moment from 'moment';
import sinon from 'sinon';

import { expect } from 'chai';

import {
  getOrderFormPrice,
  getOrderedMeals,
} from '../../../src/web/selectors/orders';

describe('Order selectors', () => {
  beforeEach(() => {
    sinon.stub(moment, 'now');
    moment.now.returns('2016-01-02T03:04:05Z');
  });
  afterEach(() => {
    moment.now.restore();
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
      capacity: {
        data: {},
      },
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      meals: {
        data: [],
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
      },
      years: {
        data: [
          {
            id: 1,
            current: true,
            year: '2016',
            priceLevels: [],
          },
        ],
      },
    })).to.equal(0);
  });
  it('getOrderFormPrice returns zero price with no workshop', () => {
    expect(getOrderFormPrice({
      forms: {
        order: {
          values: {},
        },
      },
      capacity: {
        data: {},
      },
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      meals: {
        data: [],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [
          {
            id: 1,
            current: true,
            year: '2016',
            priceLevels: [],
          },
        ],
      },
    })).to.equal(0);
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
      capacity: {
        data: {},
      },
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      meals: {
        data: [],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [
          {
            id: 1,
            current: true,
            year: '2016',
            priceLevels: [],
          },
        ],
      },
    })).to.equal(0);
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
      capacity: {
        data: {},
      },
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      meals: {
        data: [],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [
          {
            id: 1,
            current: true,
            year: '2016',
            priceLevels: [],
          },
        ],
      },
    })).to.equal(0);
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
      capacity: {
        data: {},
      },
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      meals: {
        data: [],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [
          {
            id: 1,
            current: true,
            year: '2016',
            priceLevels: [],
          },
        ],
      },
    })).to.equal(0);
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
      capacity: {
        data: {},
      },
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      meals: {
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
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [
          {
            id: 1,
            current: true,
            year: '2016',
            priceLevels: [],
          },
        ],
      },
    })).to.equal(200);
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
      capacity: {
        data: {},
      },
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      meals: {
        data: [],
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
      },
      years: {
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
    })).to.equal(400);
  });
  it('getOrderedMeals returns empty array without order', () => {
    expect(getOrderedMeals({
      meals: {
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
      accomodation: {
        data: [],
      },
      capacity: {
        data: [],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
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
      participant: {
        orders: {
          data: [],
        },
      },
    })).to.eql([]);
  });
  it('getOrderedMeals returns meals with groupped food', () => {
    expect(getOrderedMeals({
      meals: {
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
      accomodation: {
        data: [],
      },
      capacity: {
        data: [],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
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
      participant: {
        orders: {
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
    })).to.eql([
      {
        id: 1,
        name: 'lunch',
        date: '2016-04-03',
        foods: [
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
        foods: [
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
});
