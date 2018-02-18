import performerList from '../performerList';

describe('Performers reducer', () => {
  it('returns default state', () => {
    expect(performerList()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on PERFORMERS_FETCH_STARTED', () => {
    expect(performerList({}, { type: 'PERFORMERS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on PERFORMERS_FETCH_SUCCESS', () => {
    expect(performerList(
      {},
      {
        type: 'PERFORMERS_FETCH_SUCCESS',
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

  it('marks as loading on PERFORMERS_FETCH_ERROR', () => {
    expect(performerList({}, { type: 'PERFORMERS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
