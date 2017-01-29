import { expect } from 'chai';

import workshops from '../../../src/web/reducers/workshops';

describe('Workshops reducer', () => {
  it('returns default state', () => {
    expect(workshops()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on WORKSHOPS_FETCH_STARTED', () => {
    expect(workshops({}, { type: 'WORKSHOPS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on WORKSHOPS_FETCH_SUCCESS', () => {
    expect(workshops(
      {},
      {
        type: 'WORKSHOPS_FETCH_SUCCESS',
        data: [
          { year: '2016' },
          { year: '2017' },
        ],
      }
    )).to.eql({
      loading: false,
      ready: true,
      valid: true,
      data: [
        { year: '2016' },
        { year: '2017' },
      ],
    });
  });

  it('marks as loading on WORKSHOPS_FETCH_ERROR', () => {
    expect(workshops({}, { type: 'WORKSHOPS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
