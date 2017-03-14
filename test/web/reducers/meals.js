import { expect } from 'chai';

import meals from '../../../src/web/reducers/meals';

describe('Meals reducer', () => {
  it('returns default state', () => {
    expect(meals()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on MEALS_FETCH_STARTED', () => {
    expect(meals({}, { type: 'MEALS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on MEALS_FETCH_SUCCESS', () => {
    expect(meals(
      {},
      {
        type: 'MEALS_FETCH_SUCCESS',
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

  it('marks as loading on MEALS_FETCH_ERROR', () => {
    expect(meals({}, { type: 'MEALS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
