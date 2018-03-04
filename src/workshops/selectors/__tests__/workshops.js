import * as selectors from '..';

describe('Workshops selectors', () => {
  it('getWorkshopDetailState returns Detail state', () => {
    expect(selectors.getWorkshopDetailState({
      workshops: {
        detail: {
          loading: false,
          valid: false,
        },
      },
    })).toEqual({
      loading: false,
      valid: false,
    });
  });

  it('getDifficultiesState returns Difficulties state', () => {
    expect(selectors.getDifficultiesState({
      workshops: {
        difficulties: {
          loading: false,
          valid: false,
        },
      },
    })).toEqual({
      loading: false,
      valid: false,
    });
  });

  it('getLocationsState returns Locations state', () => {
    expect(selectors.getLocationsState({
      workshops: {
        locations: {
          loading: false,
          valid: false,
        },
      },
    })).toEqual({
      loading: false,
      valid: false,
    });
  });

  it('getWorkshopListState returns List state', () => {
    expect(selectors.getWorkshopListState({
      workshops: {
        list: {
          loading: false,
          valid: false,
        },
      },
    })).toEqual({
      loading: false,
      valid: false,
    });
  });

  it('getWorkshopList returns all workshops stored', () => {
    expect(selectors.getWorkshopList({
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
    })).toEqual([
      {
        id: 1,
        capacityStatus: {},
        difficulty: null,
        lectors: [],
        prices: [],
      },
    ]);
  });

  it('workshopsDetail returns detail of the stored workshop', () => {
    expect(selectors.workshopsDetail({
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
    })).toEqual({
      id: 1,
      capacityStatus: {},
      difficulty: null,
      name: 'foo',
      lectors: [],
      prices: [],
    });
  });

  it('workshopsDetail returns null when not available', () => {
    expect(selectors.workshopsDetail({
      workshops: {
        detail: {
          data: null,
        },
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
      },
      years: {
        capacity: {
          data: [],
        },
        list: {
          data: [],
        },
      },
    })).toEqual(null);
  });

  it('getWorkshopDetailId returns id of displayed workshop', () => {
    expect(selectors.getWorkshopDetailId({
      workshops: {
        detail: {
          id: 53,
        },
      },
    })).toBe(53);
  });

  it('getAddresses returns list of all workshop location addresses', () => {
    expect(selectors.getAddresses({
      workshops: {
        locations: {
          data: [
            {
              id: 1,
              address: 'Nádražní 14',
            },
            {
              id: 2,
              address: 'Pražská 1',
            },
          ],
        },
      },
    })).toEqual([
      'Nádražní 14',
      'Pražská 1',
    ]);
  });

  it('getLocations returns list of all locations', () => {
    expect(selectors.getLocations({
      workshops: {
        locations: {
          data: [
            {
              id: 1,
              address: 'Nádražní 14',
            },
          ],
        },
      },
    })).toEqual([
      {
        id: 1,
        address: 'Nádražní 14',
      },
    ]);
  });

  it('getLocationMarkers returns list of all geocoded locations', () => {
    expect(selectors.getLocationMarkers({
      geocode: {
        'Nádražní 1': {
          valid: true,
          data: { lat: 'foo', lng: 'bar' },
        },
        'Hradecká 42': {
          valid: false,
        },
      },
      workshops: {
        locations: {
          data: [
            {
              id: 1,
              address: 'Nádražní 1',
            },
            {
              id: 2,
              address: 'Pražská 9',
            },
            {
              id: 3,
              address: 'Hradecká 42',
            },
          ],
        },
      },
    })).toEqual([
      {
        id: 1,
        address: 'Nádražní 1',
        lat: 'foo',
        lng: 'bar',
      },
    ]);
  });

  it('isWorkshopListRequired returns true when in invalid state', () => {
    expect(selectors.isWorkshopListRequired({
      workshops: {
        list: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isWorkshopListRequired returns false when in valid state', () => {
    expect(selectors.isWorkshopListRequired({
      workshops: {
        list: {
          valid: true,
        },
      },
    })).toBe(false);
  });

  it('isWorkshopDetailRequired returns true when in invalid state', () => {
    expect(selectors.isWorkshopDetailRequired({
      workshops: {
        detail: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isWorkshopDetailRequired returns false when in valid state', () => {
    expect(selectors.isWorkshopDetailRequired({
      workshops: {
        detail: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).toBe(false);
  });

  it('isDifficultyListRequired returns true when in invalid state', () => {
    expect(selectors.isDifficultyListRequired({
      workshops: {
        difficulties: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isDifficultyListRequired returns false when in valid state', () => {
    expect(selectors.isDifficultyListRequired({
      workshops: {
        difficulties: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).toBe(false);
  });

  it('isLocationListRequired returns true when in invalid state', () => {
    expect(selectors.isLocationListRequired({
      workshops: {
        locations: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isLocationListRequired returns false when in valid state', () => {
    expect(selectors.isLocationListRequired({
      workshops: {
        locations: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).toBe(false);
  });
});
