import { expect } from 'chai';

import { tipsAll, isValid } from '../../../src/web/selectors/tips';

describe('Tips selectors', () => {
  it('tipsAll returns all news stored', () => {
    expect(tipsAll({
      tips: {
        data: [
          { id: 1 },
        ],
      },
    })).to.eql([
      { id: 1 },
    ]);
  });

  it('isValid returns false when in invalid state', () => {
    expect(isValid({})).to.equal(false);
    expect(isValid({ tips: {} })).to.equal(false);
    expect(isValid({ tips: { valid: false } })).to.equal(false);
  });

  it('isValid returns true when in valid state', () => {
    expect(isValid({ tips: { valid: true } })).to.equal(true);
  });
});
