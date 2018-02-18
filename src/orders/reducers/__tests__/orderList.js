import orderList from '../orderList';

describe('Orders reducer', () => {
  it('returns default state', () => {
    expect(orderList()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on ORDERS_FETCH_STARTED', () => {
    expect(orderList({}, { type: 'ORDERS_FETCH_STARTED' })).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on ORDERS_FETCH_SUCCESS', () => {
    expect(orderList(
      {},
      {
        type: 'ORDERS_FETCH_SUCCESS',
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

  it('marks as loading on ORDERS_FETCH_ERROR', () => {
    expect(orderList({}, { type: 'ORDERS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });

  it('invalidates data on cancel', () => {
    expect(orderList({}, { type: 'ORDER_CANCELED' })).toMatchObject({
      valid: false,
    });
  });

  it('invalidates data on create', () => {
    expect(orderList({}, { type: 'ORDER_CREATED' })).toMatchObject({
      valid: false,
    });
  });

  it('invalidates data on logout', () => {
    expect(orderList({}, { type: 'PARTICIPANT_LOGOUT' })).toMatchObject({
      valid: false,
    });
  });
});
