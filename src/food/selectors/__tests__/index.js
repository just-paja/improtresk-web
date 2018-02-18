import * as selectors from '..';

describe('Food selectors', () => {
  it('getMealList returns all news stored', () => {
    expect(selectors.getMealList({
      food: {
        list: {
          data: [
            { id: 1 },
          ],
        },
      },
    })).toEqual([
      { id: 1 },
    ]);
  });

  it('isMealListRequired returns true when in invalid state', () => {
    expect(selectors.isMealListRequired({
      food: {
        list: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('isMealListRequired returns false when in valid state', () => {
    expect(selectors.isMealListRequired({
      food: {
        list: {
          valid: true,
        },
      },
    })).toBe(false);
  });
});
