import { expect } from 'chai';

import archive from '../../../src/web/reducers/archive';

describe('Archive reducer', () => {
  it('returns default state', () => {
    expect(archive()).to.eql({
      current: null,
      data: null,
      loading: false,
    });
  });

  it('marks as loading on ARCHIVED_YEAR_MOUNTED', () => {
    expect(archive({}, { type: 'ARCHIVED_YEAR_MOUNTED', year: 2017 })).to.eql({
      current: 2017,
    });
  });

  it('marks as loading on ARCHIVED_YEAR_FETCH_STARTED', () => {
    expect(archive({}, { type: 'ARCHIVED_YEAR_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on ARCHIVED_YEAR_FETCH_SUCCESS', () => {
    expect(archive(
      {},
      {
        type: 'ARCHIVED_YEAR_FETCH_SUCCESS',
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

  it('marks as loading on ARCHIVED_YEAR_FETCH_ERROR', () => {
    expect(archive({}, { type: 'ARCHIVED_YEAR_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
