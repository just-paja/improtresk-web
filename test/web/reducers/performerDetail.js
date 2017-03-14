import { expect } from 'chai';

import performerDetail from '../../../src/web/reducers/performerDetail';

describe('Performer detail reducer', () => {
  it('returns default state', () => {
    expect(performerDetail()).to.eql({
      data: null,
      id: null,
      loading: false,
    });
  });
  it('marks as loading on PERFORMER_DETAIL_FETCH_STARTED', () => {
    expect(performerDetail({}, { type: 'PERFORMER_DETAIL_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });
  it('marks as loading on PERFORMER_DETAIL_FETCH_SUCCESS', () => {
    expect(performerDetail(
      {},
      {
        type: 'PERFORMER_DETAIL_FETCH_SUCCESS',
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
  it('marks as loading on PERFORMER_DETAIL_FETCH_ERROR', () => {
    expect(performerDetail({}, { type: 'PERFORMER_DETAIL_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
  it('saves detail id on PERFORMER_DETAIL_MOUNTED', () => {
    expect(performerDetail({}, { type: 'PERFORMER_DETAIL_MOUNTED', performer: 1 })).to.eql({
      id: 1,
    });
  });
});
