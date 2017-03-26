import { expect } from 'chai';

import {
  accomodationAll,
  getCheapestAccomodation,
  isValid,
} from '../../../src/web/selectors/accomodation';

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

  it('getCheapestAccomodation returns null when there is no accomodation', () => {
    expect(getCheapestAccomodation({
      accomodation: {
        data: [],
      },
    })).to.equal(null);
  });

  it('getCheapestAccomodation returns accomodation with lowest price', () => {
    expect(getCheapestAccomodation({
      accomodation: {
        data: [
          {
            id: 1,
            price: 200,
          },
          {
            id: 2,
            price: 300,
          },
          {
            id: 3,
            price: 0,
          },
        ],
      },
    })).to.eql({
      id: 3,
      price: 0,
    });
  });
});
