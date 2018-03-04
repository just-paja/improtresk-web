import * as selectors from '../app';

describe('Application selectors', () => {
  it('countAppRequests returns 0 when no request is loading', () => {
    expect(selectors.countAppRequests({
      accomodation: {
        loading: false,
      },
      workshops: {
        workshopDetail: {
          loading: null,
        },
      },
    })).toBe(0);
  });

  it('countAppRequests returns number reducers flagged as loading', () => {
    expect(selectors.countAppRequests({
      accomodation: {
        loading: true,
      },
      workshops: {
        workshopDetail: {
          loading: true,
        },
      },
    })).toBe(2);
  });

  it('getAppErrors all fatal errors', () => {
    expect(selectors.getAppErrors({
      accomodation: {
        error: new Error('foo'),
      },
      workshops: {
        workshopDetail: {
          error: new Error('bar'),
          data: [],
        },
      },
      news: {
        error: undefined,
      },
    })).toEqual(['foo', 'bar']);
  });

  it('getAppErrors all fatal errors', () => {
    expect(selectors.getAppErrors({
      accomodation: {
        error: new Error('foo'),
        id: 123,
      },
      workshops: {
        workshopDetail: {
          error: new Error('bar'),
          data: [],
        },
      },
      news: {
        error: undefined,
      },
    })).toEqual(['foo', 'bar']);
  });

  it('getAppProgress returns app loading progress', () => {
    expect(selectors.getAppProgress({
      workshops: {
        difficulties: {
          loading: false,
          valid: false,
        },
        lectors: {
          list: {
            loading: false,
            valid: true,
          },
          roles: {
            loading: false,
            valid: true,
          },
        },
      },
      participants: {
        detail: {
          data: {},
          valid: true,
        },
      },
      years: {
        loading: false,
        valid: true,
      },
    })).toMatchObject({
      loading: false,
      valid: false,
    });
  });
});
