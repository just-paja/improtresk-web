import capacity from '../yearCapacity';

describe('Capacity reducer', () => {
  it('returns default state', () => {
    expect(capacity()).toMatchObject({
      data: {},
      loading: false,
      polling: false,
    });
  });
  it('marks as loading on YEAR_CAPACITY_FETCH_STARTED', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });
  it('marks as loading on YEAR_CAPACITY_FETCH_SUCCESS', () => {
    expect(capacity(
      {},
      {
        type: 'YEAR_CAPACITY_FETCH_SUCCESS',
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
  it('marks as loading on YEAR_CAPACITY_FETCH_ERROR', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
  it('marks as loading on YEAR_CAPACITY_POLL_START', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_POLL_START' })).toMatchObject({
      polling: true,
    });
  });
  it('marks as loading on YEAR_CAPACITY_POLL_STOP', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_POLL_STOP' })).toMatchObject({
      polling: false,
    });
  });
});
