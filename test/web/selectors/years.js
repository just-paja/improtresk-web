import { expect } from 'chai';

import { yearCurrent, yearsNotCurrent, yearsAll } from '../../../src/web/selectors/years';

describe('News selectors', () => {
  it('yearsAll returns all news stored', () => {
    expect(yearsAll({
      years: {
        data: [
          { id: 1 },
          { id: 2 },
        ],
      },
    })).to.eql([
      { id: 1 },
      { id: 2 },
    ]);
  });
  it('yearCurrent returns current year object when available', () => {
    expect(yearCurrent({
      years: {
        data: [
          { id: 1 },
          { id: 2, current: true },
        ],
      },
    })).to.eql({
      id: 2,
      current: true,
    });
  });
  it('yearCurrent returns null when not available', () => {
    expect(yearCurrent({
      years: {
        data: [
          { id: 1 },
          { id: 2 },
        ],
      },
    })).to.equal(null);
  });
  it('yearsNotCurrent returns null when not available', () => {
    expect(yearsNotCurrent({
      years: {
        data: [
          { id: 1 },
          { id: 2 },
        ],
      },
    })).to.eql([
      { id: 1 },
      { id: 2 },
    ]);
  });
});
