import newsList from '../newsList';

describe('News reducer', () => {
  it('returns default state', () => {
    expect(newsList()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on NEWS_FETCH_STARTED', () => {
    expect(newsList({}, { type: 'NEWS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on NEWS_FETCH_SUCCESS', () => {
    expect(newsList(
      {},
      {
        type: 'NEWS_FETCH_SUCCESS',
        data: [
          { year: '2016' },
          { year: '2017' },
        ],
      }
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { year: '2016' },
        { year: '2017' },
      ],
    });
  });

  it('marks as loading on NEWS_FETCH_ERROR', () => {
    expect(newsList({}, { type: 'NEWS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
