import { expect } from 'chai';

import years from '../../../src/web/reducers/years';

describe('Years reducer', () => {
  it('returns default state', () => {
    expect(years()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on YEARS_FETCH_STARTED', () => {
    expect(years({}, { type: 'YEARS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on YEARS_FETCH_SUCCESS', () => {
    expect(years(
      {},
      {
        type: 'YEARS_FETCH_SUCCESS',
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

  it('marks as loading on YEARS_FETCH_ERROR', () => {
    expect(years({}, { type: 'YEARS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      error: 'error',
    });
  });
});
