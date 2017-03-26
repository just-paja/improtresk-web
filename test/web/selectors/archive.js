import { expect } from 'chai';

import {
  getCurrent,
  getArchivedYear,
  getArchivedYearTopic,
  getArchivedYearWorkshops,
  isValid,
} from '../../../src/web/selectors/archive';

describe('Archive selectors', () => {
  it('getCurrent returns id of displayed year', () => {
    expect(getCurrent({
      archive: {
        current: 32,
      },
    })).to.equal(32);
  });
  it('getArchivedYear returns year number when present', () => {
    expect(getArchivedYear({
      archive: {
        data: { year: 2017 },
      },
    })).to.equal(2017);
  });
  it('getArchivedYear returns null when missing', () => {
    expect(getArchivedYear({
      archive: {
      },
    })).to.equal(null);
  });
  it('getArchivedYearTopic returns year number when present', () => {
    expect(getArchivedYearTopic({
      archive: {
        data: { topic: 'foo' },
      },
    })).to.equal('foo');
  });
  it('getArchivedYearTopic returns null when missing', () => {
    expect(getArchivedYearTopic({
      archive: {
      },
    })).to.equal(null);
  });
  it('getArchivedYearWorkshops returns archived year workshops when present', () => {
    expect(getArchivedYearWorkshops({
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
    })).to.eql([
      {
        capacityStatus: {},
        difficulty: null,
        lectors: [],
        prices: [],
        name: 'foo',
      },
    ]);
  });
  it('getArchivedYearWorkshops returns empty array when missing year', () => {
    expect(getArchivedYearWorkshops({
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
    })).to.eql([]);
  });

  it('isValid returns false when in invalid state', () => {
    expect(isValid({})).to.equal(false);
    expect(isValid({ archive: {} })).to.equal(false);
    expect(isValid({ archive: { valid: false } })).to.equal(false);
  });

  it('isValid returns true when in valid state', () => {
    expect(isValid({
      archive: {
        current: '2017',
        data: {
          year: '2017',
        },
        valid: true,
      },
    })).to.equal(true);
  });
});
