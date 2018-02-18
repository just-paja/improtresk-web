import mealList from '../mealList';

describe('Meals reducer', () => {
  it('returns default state', () => {
    expect(mealList()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on MEALS_FETCH_STARTED', () => {
    expect(mealList({}, { type: 'MEALS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on MEALS_FETCH_SUCCESS', () => {
    expect(mealList(
      {},
      {
        type: 'MEALS_FETCH_SUCCESS',
        data: [
          { name: 'foo' },
        ],
      }
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });

  it('marks as loading on MEALS_FETCH_ERROR', () => {
    expect(mealList({}, { type: 'MEALS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
