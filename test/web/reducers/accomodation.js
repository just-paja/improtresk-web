import { expect } from 'chai';

import accomodation from '../../../src/web/reducers/accomodation';

describe('Accomodation reducer', () => {
  it('returns default state', () => {
    expect(accomodation()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on ACCOMODATION_FETCH_STARTED', () => {
    expect(accomodation({}, { type: 'ACCOMODATION_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on ACCOMODATION_FETCH_SUCCESS', () => {
    expect(accomodation(
      {},
      {
        type: 'ACCOMODATION_FETCH_SUCCESS',
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

  it('marks as loading on ACCOMODATION_FETCH_ERROR', () => {
    expect(accomodation({}, { type: 'ACCOMODATION_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
