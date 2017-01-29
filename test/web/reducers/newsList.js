import { expect } from 'chai';

import newsList from '../../../src/web/reducers/newsList';

describe('News reducer', () => {
  it('returns default state', () => {
    expect(newsList()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on NEWS_FETCH_STARTED', () => {
    expect(newsList({}, { type: 'NEWS_FETCH_STARTED' })).to.eql({
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
    expect(newsList({}, { type: 'NEWS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
