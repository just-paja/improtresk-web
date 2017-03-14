import { expect } from 'chai';

import capacity from '../../../src/web/reducers/capacity';

describe('Capacity reducer', () => {
  it('returns default state', () => {
    expect(capacity()).to.eql({
      data: {},
      loading: false,
      polling: false,
    });
  });
  it('marks as loading on YEAR_CAPACITY_FETCH_STARTED', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_FETCH_STARTED' })).to.eql({
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
    )).to.eql({
      loading: false,
      ready: true,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });
  it('marks as loading on YEAR_CAPACITY_FETCH_ERROR', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
  it('marks as loading on YEAR_CAPACITY_POLL_START', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_POLL_START' })).to.eql({
      polling: true,
    });
  });
  it('marks as loading on YEAR_CAPACITY_POLL_STOP', () => {
    expect(capacity({}, { type: 'YEAR_CAPACITY_POLL_STOP' })).to.eql({
      polling: false,
    });
  });
});
