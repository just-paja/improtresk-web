import newsDetail from '../newsDetail';

describe('News detail reducer', () => {
  it('returns default state', () => {
    expect(newsDetail()).toMatchObject({
      loading: false,
      data: null,
      id: null,
    });
  });

  it('marks as loading on NEWS_DETAIL_FETCH_STARTED', () => {
    expect(newsDetail({}, { type: 'NEWS_DETAIL_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as finished loading on NEWS_DETAIL_FETCH_SUCCESS', () => {
    expect(newsDetail(
      {},
      {
        type: 'NEWS_DETAIL_FETCH_SUCCESS',
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

  it('marks as not loading on NEWS_DETAIL_FETCH_ERROR', () => {
    expect(newsDetail({}, { type: 'NEWS_DETAIL_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });

  it('saves detail id on NEWS_DETAIL_REQUIRED', () => {
    expect(newsDetail({}, { type: 'NEWS_DETAIL_REQUIRED', news: 1 })).toMatchObject({
      id: 1,
    });
  });
});
