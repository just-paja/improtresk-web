import workshopDetail from '../workshopDetail';

describe('Workshops list reducer', () => {
  it('returns default state', () => {
    expect(workshopDetail()).toMatchObject({
      data: null,
      id: null,
      loading: false,
    });
  });

  it('marks as loading on WORKSHOP_DETAIL_FETCH_STARTED', () => {
    expect(workshopDetail({}, { type: 'WORKSHOP_DETAIL_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on WORKSHOP_DETAIL_FETCH_SUCCESS', () => {
    expect(workshopDetail(
      {},
      {
        type: 'WORKSHOP_DETAIL_FETCH_SUCCESS',
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

  it('marks as loading on WORKSHOP_DETAIL_FETCH_ERROR', () => {
    expect(workshopDetail({}, { type: 'WORKSHOP_DETAIL_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });

  it('saves detail id on WORKSHOP_DETAIL_REQUIRED', () => {
    expect(workshopDetail({}, { type: 'WORKSHOP_DETAIL_REQUIRED', workshop: 1 })).toMatchObject({
      id: 1,
    });
  });
});
