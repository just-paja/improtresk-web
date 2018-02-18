import * as transformers from '../orders';

describe('Order transformers', () => {
  it('aggregateOrderWorkshopData returns null without reservation', () => {
    expect(transformers.aggregateOrderWorkshopData()).toBe(null);
  });
  it('aggregateOrderWorkshopData returns null without selected workshop price', () => {
    expect(transformers.aggregateOrderWorkshopData({})).toBe(null);
  });
  it('aggregateOrderWorkshopData returns null without selected workshop', () => {
    expect(transformers.aggregateOrderWorkshopData({ workshopPrice: {} })).toBe(null);
  });
  it('aggregateOrderWorkshopData returns null with unknown workshop', () => {
    expect(transformers.aggregateOrderWorkshopData({
      workshopPrice: {
        workshop: 4,
      },
    }, [])).toBe(null);
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
    ])).toEqual({
      id: 4,
      name: 'foo',
    });
  });

  it('aggregateOrderMealsData returns empty array without reservation', () => {
    expect(transformers.aggregateOrderMealsData()).toEqual([]);
  });
  it('aggregateOrderMealsData returns empty array without reservation', () => {
    expect(transformers.aggregateOrderMealsData({})).toEqual([]);
  });
  it('aggregateOrderMealsData returns empty array with unknown reservations', () => {
    expect(transformers.aggregateOrderMealsData({
      mealReservation: [5, 9],
    }, [])).toEqual([]);
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
    ])).toEqual([
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
    expect(transformers.aggregateOrderAccomodationData()).toBe(null);
  });
  it('aggregateOrderAccomodationData returns empty array without reservation', () => {
    expect(transformers.aggregateOrderAccomodationData({})).toBe(null);
  });
  it('aggregateOrderAccomodationData returns empty array with unknown reservations', () => {
    expect(transformers.aggregateOrderAccomodationData({
      accomodation: 5,
    }, [])).toBe(null);
  });
  it('aggregateOrderAccomodationData returns accomodation', () => {
    expect(transformers.aggregateOrderAccomodationData({
      accomodation: 5,
    }, [
      {
        id: 5,
        name: 'foo',
      },
    ])).toEqual({
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
    })).toEqual({
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
    })).toEqual({
      id: 1,
      accomodation: null,
      endsAt: null,
      meals: [],
      workshop: null,
    });
  });
});
