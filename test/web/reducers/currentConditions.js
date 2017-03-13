import { expect } from 'chai';

import currentConditions from '../../../src/web/reducers/currentConditions';

describe('Current Conditions reducer', () => {
  it('returns default state', () => {
    expect(currentConditions()).to.eql({
      loading: false,
      data: {},
    });
  });

  it('marks as loading on CONDITIONS_CURRENT_FETCH_STARTED', () => {
    expect(currentConditions({}, { type: 'CONDITIONS_CURRENT_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on CONDITIONS_CURRENT_FETCH_SUCCESS', () => {
    expect(currentConditions(
      {},
      {
        type: 'CONDITIONS_CURRENT_FETCH_SUCCESS',
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

  it('marks as loading on CONDITIONS_CURRENT_FETCH_ERROR', () => {
    expect(currentConditions({}, { type: 'CONDITIONS_CURRENT_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
