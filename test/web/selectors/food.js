import { expect } from 'chai';

import { foodTimesAll, isValid } from '../../../src/web/selectors/food';

describe('News selectors', () => {
  it('foodTimesAll returns all news stored', () => {
    expect(foodTimesAll({
      foodTimes: {
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
    expect(isValid({ foodTimes: {} })).to.equal(false);
    expect(isValid({ foodTimes: { valid: false } })).to.equal(false);
  });

  it('isValid returns true when in valid state', () => {
    expect(isValid({ foodTimes: { valid: true } })).to.equal(true);
  });
});
