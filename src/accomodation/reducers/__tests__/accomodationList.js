import list from '../accomodationList';

describe('Accomodation reducer', () => {
  it('returns default state', () => {
    expect(list()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on ACCOMODATION_FETCH_STARTED', () => {
    expect(list({}, { type: 'ACCOMODATION_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on ACCOMODATION_FETCH_SUCCESS', () => {
    expect(list(
      {},
      {
        type: 'ACCOMODATION_FETCH_SUCCESS',
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

  it('marks as loading on ACCOMODATION_FETCH_ERROR', () => {
    expect(list({}, { type: 'ACCOMODATION_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
