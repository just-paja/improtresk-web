import participantDetail from '../participantDetail';

describe('participantDetail reducer', () => {
  it('returns default state', () => {
    expect(participantDetail()).toMatchObject({
      loading: false,
      data: null,
    });
  });
  it('marks as loading on PARTICIPANT_FETCH_STARTED', () => {
    expect(participantDetail({}, { type: 'PARTICIPANT_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });
  it('marks as loading on PARTICIPANT_FETCH_SUCCESS', () => {
    expect(participantDetail(
      {},
      {
        type: 'PARTICIPANT_FETCH_SUCCESS',
        data: [
          { name: 'foo' },
        ],
      }
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });
  it('marks as loading on PARTICIPANT_FETCH_ERROR', () => {
    expect(participantDetail({}, { type: 'PARTICIPANT_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
  it('saves data on PARTICIPANT_REGISTERED', () => {
    expect(participantDetail({}, {
      type: 'PARTICIPANT_REGISTERED',
      data: { name: 'foo' },
    })).toMatchObject({
      data: { name: 'foo' },
      loading: false,
      valid: true,
    });
  });
  it('drops data on PARTICIPANT_LOGOUT', () => {
    expect(participantDetail({}, { type: 'PARTICIPANT_LOGOUT' })).toMatchObject({
      data: null,
      valid: false,
    });
  });
});
