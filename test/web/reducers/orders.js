import { expect } from 'chai';

import orders from '../../../src/web/reducers/orders';

describe('Meals reducer', () => {
  it('returns default state', () => {
    expect(orders()).to.eql({
      loading: false,
      data: null,
    });
  });

  it('saves data on create', () => {
    expect(orders({}, {
      type: 'ORDER_CREATED',
      data: { foo: 'bar' },
    })).to.eql({
      data: { foo: 'bar' },
    });
  });
});
