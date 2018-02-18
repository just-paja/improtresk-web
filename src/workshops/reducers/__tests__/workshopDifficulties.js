import workshopDifficulties from '../workshopDifficulties';

describe('WorkshopDifficulties reducer', () => {
  it('returns default state', () => {
    expect(workshopDifficulties()).toMatchObject({
      data: [],
      loading: false,
    });
  });
  it('marks as loading on WORKSHOP_DIFFICULTIES_FETCH_STARTED', () => {
    expect(workshopDifficulties({}, { type: 'WORKSHOP_DIFFICULTIES_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });
  it('marks as loading on WORKSHOP_DIFFICULTIES_FETCH_SUCCESS', () => {
    expect(workshopDifficulties(
      {},
      {
        type: 'WORKSHOP_DIFFICULTIES_FETCH_SUCCESS',
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
  it('marks as loading on WORKSHOP_DIFFICULTIES_FETCH_ERROR', () => {
    expect(workshopDifficulties({}, { type: 'WORKSHOP_DIFFICULTIES_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
