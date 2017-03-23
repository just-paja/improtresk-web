import { expect } from 'chai';

import participantOrders from '../../../src/web/reducers/participantOrders';

describe('Participant Orders reducer', () => {
  it('returns default state', () => {
    expect(participantOrders()).to.eql({
      loading: false,
      data: [],
    });
  });
  it('marks as loading on PARTICIPANT_ORDERS_FETCH_STARTED', () => {
    expect(participantOrders({}, { type: 'PARTICIPANT_ORDERS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });
  it('marks as loading on PARTICIPANT_ORDERS_FETCH_SUCCESS', () => {
    expect(participantOrders(
      {},
      {
        type: 'PARTICIPANT_ORDERS_FETCH_SUCCESS',
        data: [
          { name: 'foo' },
        ],
      }
    )).to.eql({
      loading: false,
      ready: true,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });
  it('marks as loading on PARTICIPANT_ORDERS_FETCH_ERROR', () => {
    expect(participantOrders({}, { type: 'PARTICIPANT_ORDERS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
  it('invalidates data on cancel', () => {
    expect(participantOrders({}, { type: 'ORDER_CANCELED' })).to.eql({
      valid: false,
    });
  });
  it('invalidates data on create', () => {
    expect(participantOrders({}, { type: 'ORDER_CREATED' })).to.eql({
      valid: false,
    });
  });
  it('invalidates data on logout', () => {
    expect(participantOrders({}, { type: 'PARTICIPANT_LOGOUT' })).to.eql({
      valid: false,
    });
  });
});
