import { expect } from 'chai';

import { mealsAll, isValid } from '../../../src/web/selectors/food';

describe('Meals selectors', () => {
  it('mealsAll returns all news stored', () => {
    expect(mealsAll({
      meals: {
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
    expect(isValid({ meals: {} })).to.equal(false);
    expect(isValid({ meals: { valid: false } })).to.equal(false);
  });

  it('isValid returns true when in valid state', () => {
    expect(isValid({ meals: { valid: true } })).to.equal(true);
  });
});
