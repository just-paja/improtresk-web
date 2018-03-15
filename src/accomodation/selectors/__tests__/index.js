import * as selectors from '../';

describe('Accomodation selectors', () => {
  it('getAccomodationList returns all accomodation stored', () => {
    expect(selectors.getAccomodationList({
      accomodation: {
        list: {
          data: [
            { id: 1 },
          ],
        },
      },
      years: {
        capacity: {
          data: [],
        },
      },
    })).toEqual([
      {
        id: 1,
        capacityStatus: {},
      },
    ]);
  });

  it('getAccomodationList accomodation with capacity data', () => {
    expect(selectors.getAccomodationList({
      accomodation: {
        list: {
          data: [
            { id: 1 },
          ],
        },
      },
      years: {
        capacity: {
          data: {
            accomodation: [
              {
                capacity: 25,
                id: 1,
                number_of_reservations: 10,
                number_of_unpaid_reservations: 5,
              },
            ],
          },
        },
      },
    })).toEqual([
      {
        id: 1,
        capacityStatus: {
          assigned: 10,
          capacity: 25,
          freeSpots: 10,
          fullyAssigned: false,
          fullyReserved: false,
          reserved: 5,
        },
      },
    ]);
  });

  it('isAccomodationListRequired returns true when in invalid state', () => {
    expect(selectors.isAccomodationListRequired({
      accomodation: {
        list: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isAccomodationListRequired returns false when in valid state', () => {
    expect(selectors.isAccomodationListRequired({
      accomodation: {
        list: {
          valid: true,
        },
      },
    })).toBe(false);
  });

  it('getCheapestAccomodation returns null when there is no accomodation', () => {
    expect(selectors.getCheapestAccomodation({
      accomodation: {
        list: {
          data: [],
        },
      },
      years: {
        capacity: {
          data: [],
        },
      },
    })).toBe(null);
  });

  it('getCheapestAccomodation returns accomodation with lowest price', () => {
    expect(selectors.getCheapestAccomodation({
      accomodation: {
        list: {
          data: [
            {
              id: 1,
              price: 200,
            },
            {
              id: 2,
              price: 300,
            },
            {
              id: 3,
              price: 0,
            },
          ],
        },
      },
      years: {
        capacity: {
          data: [],
        },
      },
    })).toEqual({
      id: 3,
      price: 0,
      capacityStatus: {},
    });
  });
});
