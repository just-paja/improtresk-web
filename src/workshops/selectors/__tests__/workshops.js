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
});
