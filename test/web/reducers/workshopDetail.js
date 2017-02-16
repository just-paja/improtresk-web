import { expect } from 'chai';

import workshopDetail from '../../../src/web/reducers/workshopDetail';

describe('Workshops list reducer', () => {
  it('returns default state', () => {
    expect(workshopDetail()).to.eql({
      data: null,
      id: null,
      loading: false,
    });
  });
  it('marks as loading on WORKSHOP_DETAIL_FETCH_STARTED', () => {
    expect(workshopDetail({}, { type: 'WORKSHOP_DETAIL_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });
  it('marks as loading on WORKSHOP_DETAIL_FETCH_SUCCESS', () => {
    expect(workshopDetail(
      {},
      {
        type: 'WORKSHOP_DETAIL_FETCH_SUCCESS',
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
  it('marks as loading on WORKSHOP_DETAIL_FETCH_ERROR', () => {
    expect(workshopDetail({}, { type: 'WORKSHOP_DETAIL_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
  it('saves detail id on WORKSHOP_DETAIL_MOUNTED', () => {
    expect(workshopDetail({}, { type: 'WORKSHOP_DETAIL_MOUNTED', workshop: 1 })).to.eql({
      id: 1,
    });
  });
});
