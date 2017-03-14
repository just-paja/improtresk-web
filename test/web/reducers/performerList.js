import { expect } from 'chai';

import performerList from '../../../src/web/reducers/performerList';

describe('Performers reducer', () => {
  it('returns default state', () => {
    expect(performerList()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on PERFORMERS_FETCH_STARTED', () => {
    expect(performerList({}, { type: 'PERFORMERS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on PERFORMERS_FETCH_SUCCESS', () => {
    expect(performerList(
      {},
      {
        type: 'PERFORMERS_FETCH_SUCCESS',
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

  it('marks as loading on PERFORMERS_FETCH_ERROR', () => {
    expect(performerList({}, { type: 'PERFORMERS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
