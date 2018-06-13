import yearArchive from '../yearArchive';

import { yearDetailFetch } from '../../actions';

describe('yearArchive reducer', () => {
  it('returns default state', () => {
    expect(yearArchive()).toMatchObject({
      current: null,
      data: null,
      loading: false,
    });
  });

  it('marks as loading on trigger', () => {
    expect(yearArchive({}, yearDetailFetch(2017))).toMatchObject({
      current: 2017,
      valid: false,
    });
  });

  it('marks as loading on request', () => {
    expect(yearArchive({}, yearDetailFetch.request())).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on success', () => {
    expect(yearArchive(
      {},
      yearDetailFetch.success([
        { year: '2016' },
        { year: '2017' },
      ])
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { year: '2016' },
        { year: '2017' },
      ],
    });
  });

  it('marks as failed on failure', () => {
    expect(yearArchive({}, yearDetailFetch.failure('error'))).toMatchObject({
      error: 'error',
    });
  });

  it('marks as not loadin on fulfill', () => {
    expect(yearArchive({}, yearDetailFetch.fulfill())).toMatchObject({
      loading: false,
    });
  });
});
