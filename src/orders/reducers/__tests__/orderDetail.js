import orders from '../orderDetail';

describe('Orders reducer', () => {
  it('returns default state', () => {
    expect(orders()).toMatchObject({
      loading: false,
      data: null,
    });
  });

  it('saves data on create', () => {
    expect(orders({}, {
      type: 'ORDER_CREATED',
      data: { foo: 'bar' },
    })).toMatchObject({
      data: { foo: 'bar' },
    });
  });
});
