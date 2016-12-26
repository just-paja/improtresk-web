import { expect } from 'chai';

import { currentConditions, isValid } from '../../../src/web/selectors/conditions';

describe('Conditions selectors', () => {
  it('currentConditions returns all news stored', () => {
    expect(currentConditions({
      conditions: {
        current: {
          data: {
            id: 1,
            text: 'foo',
          },
        },
      },
    })).to.eql({
      id: 1,
      text: 'foo',
    });
  });

  it('isValid returns false when in invalid state', () => {
    expect(isValid({})).to.equal(false);
    expect(isValid({ conditions: {} })).to.equal(false);
    expect(isValid({ conditions: { current: {} } })).to.equal(false);
    expect(isValid({ conditions: { current: { valid: false } } })).to.equal(false);
  });

  it('isValid returns true when in valid state', () => {
    expect(isValid({ conditions: { current: { valid: true } } })).to.equal(true);
  });
});
