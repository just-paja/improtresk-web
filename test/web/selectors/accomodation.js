import { expect } from 'chai';

import { accomodationAll, isValid } from '../../../src/web/selectors/accomodation';

describe('Accomodation selectors', () => {
  it('accomodationAll returns all news stored', () => {
    expect(accomodationAll({
      accomodation: {
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
    expect(isValid({ accomodation: {} })).to.equal(false);
    expect(isValid({ accomodation: { valid: false } })).to.equal(false);
  });

  it('isValid returns true when in valid state', () => {
    expect(isValid({ accomodation: { valid: true } })).to.equal(true);
  });
});
