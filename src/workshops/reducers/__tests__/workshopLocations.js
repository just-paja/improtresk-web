import workshopLocations from '../workshopLocations';

describe('workshopLocations reducer', () => {
  it('returns default state', () => {
    expect(workshopLocations()).toMatchObject({
      data: [],
      loading: false,
    });
  });

  it('marks as loading on WORKSHOP_LOCATIONS_FETCH_STARTED', () => {
    expect(workshopLocations({}, { type: 'WORKSHOP_LOCATIONS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on WORKSHOP_LOCATIONS_FETCH_SUCCESS', () => {
    expect(workshopLocations(
      {},
      {
        type: 'WORKSHOP_LOCATIONS_FETCH_SUCCESS',
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

  it('marks as loading on WORKSHOP_LOCATIONS_FETCH_ERROR', () => {
    expect(workshopLocations({}, { type: 'WORKSHOP_LOCATIONS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
