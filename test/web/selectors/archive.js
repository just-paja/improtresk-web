import { expect } from 'chai';

import {
  getArchivedYear,
  getArchivedYearTopic,
  getArchivedYearWorkshops,
  isValid,
} from '../../../src/web/selectors/archive';

describe('Archive selectors', () => {
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
  it('getArchivedYearWorkshops returns year number when present', () => {
    expect(getArchivedYearWorkshops({
      archive: {
        data: {
          workshops: [
            { name: 'foo' },
          ],
        },
      },
    })).to.eql([
      { name: 'foo' },
    ]);
  });
  it('getArchivedYearWorkshops returns null when missing', () => {
    expect(getArchivedYearWorkshops({
      archive: {
      },
    })).to.eql([]);
  });

  it('isValid returns false when in invalid state', () => {
    expect(isValid({})).to.equal(false);
    expect(isValid({ archive: {} })).to.equal(false);
    expect(isValid({ archive: { valid: false } })).to.equal(false);
  });

  it('isValid returns true when in valid state', () => {
    expect(isValid({ archive: { valid: true } })).to.equal(true);
  });
});
