import { expect } from 'chai';

import lectorList from '../../../src/web/reducers/lectorList';

describe('Lector list reducer', () => {
  it('returns default state', () => {
    expect(lectorList()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on LECTORS_FETCH_STARTED', () => {
    expect(lectorList({}, { type: 'LECTORS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on LECTORS_FETCH_SUCCESS', () => {
    expect(lectorList(
      {},
      {
        type: 'LECTORS_FETCH_SUCCESS',
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

  it('marks as loading on LECTORS_FETCH_ERROR', () => {
    expect(lectorList({}, { type: 'LECTORS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
