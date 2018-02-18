import teams from '../teams';

describe('Teams reducer', () => {
  it('returns default state', () => {
    expect(teams()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on TEAMS_FETCH_STARTED', () => {
    expect(teams({}, { type: 'TEAMS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on TEAMS_FETCH_SUCCESS', () => {
    expect(teams(
      {},
      {
        type: 'TEAMS_FETCH_SUCCESS',
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

  it('marks as loading on TEAMS_FETCH_ERROR', () => {
    expect(teams({}, { type: 'TEAMS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
