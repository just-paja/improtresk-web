import yearRules from '../yearRules';

describe('yearRules reducer', () => {
  it('returns default state', () => {
    expect(yearRules()).toMatchObject({
      loading: false,
      data: {},
    });
  });

  it('marks as loading on YEAR_RULES_FETCH_START', () => {
    expect(yearRules({}, { type: 'YEAR_RULES_FETCH_START' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on YEAR_RULES_FETCH_SUCCESS', () => {
    expect(yearRules(
      {},
      {
        type: 'YEAR_RULES_FETCH_SUCCESS',
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

  it('marks as loading on YEAR_RULES_FETCH_ERROR', () => {
    expect(yearRules(
      {},
      {
        type: 'YEAR_RULES_FETCH_ERROR',
        error: 'error',
      }
    )).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
