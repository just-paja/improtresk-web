import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/orders';

describe('Order transformers', () => {
  it('aggregateOrderWorkshopData returns null without reservation', () => {
    expect(transformers.aggregateOrderWorkshopData()).to.eql(null);
  });
  it('aggregateOrderWorkshopData returns null without selected workshop price', () => {
    expect(transformers.aggregateOrderWorkshopData({})).to.eql(null);
  });
  it('aggregateOrderWorkshopData returns null without selected workshop', () => {
    expect(transformers.aggregateOrderWorkshopData({ workshopPrice: {} })).to.eql(null);
  });
  it('aggregateOrderWorkshopData returns null with unknown workshop', () => {
    expect(transformers.aggregateOrderWorkshopData({
      workshopPrice: {
        workshop: 4,
      },
    }, [])).to.eql(null);
  });
  it('aggregateOrderWorkshopData returns workshop', () => {
    expect(transformers.aggregateOrderWorkshopData({
      workshopPrice: {
        workshop: 4,
      },
    }, [
      {
        id: 4,
        name: 'foo',
      },
    ])).to.eql({
      id: 4,
      name: 'foo',
    });
  });

  it('aggregateOrderMealsData returns empty array without reservation', () => {
    expect(transformers.aggregateOrderMealsData()).to.eql([]);
  });
  it('aggregateOrderMealsData returns empty array without reservation', () => {
    expect(transformers.aggregateOrderMealsData({})).to.eql([]);
  });
  it('aggregateOrderMealsData returns empty array with unknown reservations', () => {
    expect(transformers.aggregateOrderMealsData({
      mealReservation: [5, 9],
    }, [])).to.eql([]);
  });
  it('aggregateOrderMealsData returns aggregated reservations', () => {
    expect(transformers.aggregateOrderMealsData({
      mealReservation: [
        { id: 5 },
        { id: 9 },
      ],
    }, [
      {
        id: 5,
        name: 'foo',
      },
      {
        id: 9,
        name: 'bar',
      },
    ])).to.eql([
      {
        id: 5,
        name: 'foo',
      },
      {
        id: 9,
        name: 'bar',
      },
    ]);
  });

  it('aggregateOrderAccomodationData returns empty array without reservation', () => {
    expect(transformers.aggregateOrderAccomodationData()).to.eql(null);
  });
  it('aggregateOrderAccomodationData returns empty array without reservation', () => {
    expect(transformers.aggregateOrderAccomodationData({})).to.eql(null);
  });
  it('aggregateOrderAccomodationData returns empty array with unknown reservations', () => {
    expect(transformers.aggregateOrderAccomodationData({
      accomodation: 5,
    }, [])).to.eql(null);
  });
  it('aggregateOrderAccomodationData returns accomodation', () => {
    expect(transformers.aggregateOrderAccomodationData({
      accomodation: 5,
    }, [
      {
        id: 5,
        name: 'foo',
      },
    ])).to.eql({
      id: 5,
      name: 'foo',
    });
  });

  it('aggregateOrderData returns order extended with related data and endsAt date', () => {
    expect(transformers.aggregateOrderData([], [], [])({
      id: 1,
      reservation: {
        endsAt: '2016-01-02T03:04:05Z',
      },
    })).to.eql({
      id: 1,
      accomodation: null,
      endsAt: '2016-01-02T03:04:05Z',
      meals: [],
      reservation: {
        endsAt: '2016-01-02T03:04:05Z',
      },
      workshop: null,
    });
  });
  it('aggregateOrderData returns order extended with related data and null endsAt date', () => {
    expect(transformers.aggregateOrderData([], [], [])({
      id: 1,
    })).to.eql({
      id: 1,
      accomodation: null,
      endsAt: null,
      meals: [],
      workshop: null,
    });
  });
});
