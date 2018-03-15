import performerDetail from '../performerDetail';

describe('Performer detail reducer', () => {
  it('returns default state', () => {
    expect(performerDetail()).toMatchObject({
      data: null,
      id: null,
      loading: false,
    });
  });

  it('marks as loading on PERFORMER_DETAIL_FETCH_STARTED', () => {
    expect(performerDetail({}, { type: 'PERFORMER_DETAIL_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on PERFORMER_DETAIL_FETCH_SUCCESS', () => {
    expect(performerDetail(
      {},
      {
        type: 'PERFORMER_DETAIL_FETCH_SUCCESS',
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

  it('marks as loading on PERFORMER_DETAIL_FETCH_ERROR', () => {
    expect(performerDetail({}, { type: 'PERFORMER_DETAIL_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });

  it('saves detail id on PERFORMER_DETAIL_REQUIRED', () => {
    expect(performerDetail({}, { type: 'PERFORMER_DETAIL_REQUIRED', slug: 1 })).toMatchObject({
      id: 1,
    });
  });
});
