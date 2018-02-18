import currentConditions from '../yearConditions';

describe('Current Conditions reducer', () => {
  it('returns default state', () => {
    expect(currentConditions()).toMatchObject({
      loading: false,
      data: {},
    });
  });

  it('marks as loading on YEAR_CONDITIONS_FETCH_STARTED', () => {
    expect(currentConditions({}, { type: 'YEAR_CONDITIONS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on YEAR_CONDITIONS_FETCH_SUCCESS', () => {
    expect(currentConditions(
      {},
      {
        type: 'YEAR_CONDITIONS_FETCH_SUCCESS',
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

  it('marks as loading on YEAR_CONDITIONS_FETCH_ERROR', () => {
    expect(currentConditions(
      {},
      {
        type: 'YEAR_CONDITIONS_FETCH_ERROR',
        error: 'error',
      }
    )).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
