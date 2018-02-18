import eventList from '../eventList';

describe('eventList reducer', () => {
  it('returns default state', () => {
    expect(eventList()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on SCHEDULE_EVENTS_FETCH_STARTED', () => {
    expect(eventList({}, { type: 'SCHEDULE_EVENTS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on SCHEDULE_EVENTS_FETCH_SUCCESS', () => {
    expect(eventList(
      {},
      {
        type: 'SCHEDULE_EVENTS_FETCH_SUCCESS',
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

  it('marks as loading on SCHEDULE_EVENTS_FETCH_ERROR', () => {
    expect(eventList({}, { type: 'SCHEDULE_EVENTS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
