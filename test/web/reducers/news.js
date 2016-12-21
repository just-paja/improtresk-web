import { expect } from 'chai';

import news from '../../../src/web/reducers/news';

describe('News reducer', () => {
  it('returns default state', () => {
    expect(news()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on NEWS_FETCH_STARTED', () => {
    expect(news({}, { type: 'NEWS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on NEWS_FETCH_SUCCESS', () => {
    expect(news(
      {},
      {
        type: 'NEWS_FETCH_SUCCESS',
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

  it('marks as loading on NEWS_FETCH_ERROR', () => {
    expect(news({}, { type: 'NEWS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      error: 'error',
    });
  });
});
