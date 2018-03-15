import yearArchive from '../yearArchive';

describe('Archive reducer', () => {
  it('returns default state', () => {
    expect(yearArchive()).toMatchObject({
      current: null,
      data: null,
      loading: false,
    });
  });

  it('marks as loading on ARCHIVED_YEAR_REQUIRED', () => {
    expect(yearArchive({
    }, { type: 'YEAR_DETAIL_REQUIRED', year: 2017 })).toMatchObject({
      current: 2017,
      valid: false,
    });
  });

  it('marks as loading on YEAR_DETAIL_FETCH_STARTED', () => {
    expect(yearArchive({}, { type: 'YEAR_DETAIL_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on YEAR_DETAIL_FETCH_SUCCESS', () => {
    expect(yearArchive(
      {},
      {
        type: 'YEAR_DETAIL_FETCH_SUCCESS',
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

  it('marks as loading on YEAR_DETAIL_FETCH_ERROR', () => {
    expect(yearArchive({}, { type: 'YEAR_DETAIL_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
