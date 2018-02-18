import * as selectors from '..';

describe('Archive selectors', () => {
  it('getCurrent returns id of displayed year', () => {
    expect(selectors.getCurrent({
      years: {
        archive: {
          current: 32,
        },
      },
    })).toBe(32);
  });

  it('getArchivedYear returns year number when present', () => {
    expect(selectors.getArchivedYear({
      years: {
        archive: {
          data: { year: 2017 },
        },
      },
    })).toBe(2017);
  });

  it('getArchivedYear returns null when missing', () => {
    expect(selectors.getArchivedYear({
      years: {
        archive: {
        },
      },
    })).toBe(null);
  });

  it('getArchivedYearTopic returns year number when present', () => {
    expect(selectors.getArchivedYearTopic({
      years: {
        archive: {
          data: { topic: 'foo' },
        },
      },
    })).toBe('foo');
  });

  it('getArchivedYearTopic returns null when missing', () => {
    expect(selectors.getArchivedYearTopic({
      years: {
        archive: {
        },
      },
    })).toBe(null);
  });

  it('getArchivedYearWorkshops returns archived year workshops when present', () => {
    expect(selectors.getArchivedYearWorkshops({
      years: {
        archive: {
          data: {
            workshops: [
              {
                name: 'foo',
                lectors: [],
              },
            ],
          },
        },
        capacity: {},
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        workshops: {
          difficulties: {
            data: [],
          },
        },
        years: {
          data: [],
        },
      },
    })).toEqual([
      {
        lectors: [],
        name: 'foo',
      },
    ]);
  });

  it('getArchivedYearWorkshops returns empty array when missing year', () => {
    expect(selectors.getArchivedYearWorkshops({
      years: {
        archive: {
        },
        capacity: {},
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        workshops: {
          difficulties: {
            data: [],
          },
        },
        years: {
          data: [],
        },
      },
    })).toEqual([]);
  });

  it('isArchiveRequired returns true when in invalid state', () => {
    expect(selectors.isArchiveRequired({
      years: {
        archive: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isArchiveRequired returns false when in valid state', () => {
    expect(selectors.isArchiveRequired({
      years: {
        archive: {
          valid: true,
        },
      },
    })).toBe(false);
  });
});
