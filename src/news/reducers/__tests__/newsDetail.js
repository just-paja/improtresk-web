import newsDetail from '../newsDetail';

import { newsDetailFetch } from '../../actions';

describe('newsDetail reducer', () => {
  it('returns default state', () => {
    expect(newsDetail()).toMatchObject({
      loading: false,
      data: null,
    });
  });

  it('marks as loading on request', () => {
    expect(newsDetail({}, newsDetailFetch.request())).toMatchObject({
      loading: true,
    });
  });

  it('marks as finished loading on success', () => {
    expect(newsDetail(
      {},
      newsDetailFetch.success([
        { year: '2016' },
        { year: '2017' },
      ])
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { year: '2016' },
        { year: '2017' },
      ],
    });
  });

  it('saves error on failure', () => {
    expect(newsDetail({}, newsDetailFetch.failure('error'))).toMatchObject({
      error: 'error',
    });
  });

  it('saves detail id on require', () => {
    expect(newsDetail({}, newsDetailFetch('news-detail-1'))).toMatchObject({
      id: 'news-detail-1',
    });
  });
});
