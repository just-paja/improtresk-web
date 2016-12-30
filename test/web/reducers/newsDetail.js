import { expect } from 'chai';

import newsDetail from '../../../src/web/reducers/newsDetail';

describe('News detail reducer', () => {
  it('returns default state', () => {
    expect(newsDetail()).to.eql({
      loading: false,
      data: {},
    });
  });

  it('marks as loading on NEWS_DETAIL_FETCH_STARTED', () => {
    expect(newsDetail({}, { type: 'NEWS_DETAIL_FETCH_STARTED' })).to.eql({
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
    )).to.eql({
      loading: false,
      ready: true,
      valid: true,
      data: [
        { year: '2016' },
        { year: '2017' },
      ],
    });
  });

  it('marks as not loading on NEWS_DETAIL_FETCH_ERROR', () => {
    expect(newsDetail({}, { type: 'NEWS_DETAIL_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      error: 'error',
    });
  });
});
