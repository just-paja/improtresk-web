import * as selectors from '../yearConditions';

describe('Conditions selectors', () => {
  it('currentConditions returns all news stored', () => {
    expect(selectors.getConditions({
      years: {
        conditions: {
          data: {
            id: 1,
            text: 'foo',
          },
        },
      },
    })).toEqual({
      id: 1,
      text: 'foo',
    });
  });

  it('isConditionsTextRequired returns true when in invalid state', () => {
    expect(selectors.isConditionsTextRequired({
      years: {
        conditions: {
          loading: false,
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isConditionsTextRequired returns false when in valid state', () => {
    expect(selectors.isConditionsTextRequired({
      years: {
        conditions: {
          loading: false,
          valid: true,
        },
      },
    })).toBe(false);
  });
});
