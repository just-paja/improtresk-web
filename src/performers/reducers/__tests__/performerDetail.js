import performerDetail from '../performerDetail';

import { performerDetailFetch } from '../../actions';

describe('performerDetail reducer', () => {
  it('returns default state', () => {
    expect(performerDetail()).toMatchObject({
      data: null,
      loading: false,
    });
  });

  it('marks as loading on request', () => {
    expect(performerDetail({}, performerDetailFetch.request())).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on success', () => {
    expect(performerDetail(
      {},
      performerDetailFetch.success([
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

  it('saves error on failure', () => {
    expect(performerDetail({}, performerDetailFetch.failure('error'))).toMatchObject({
      error: 'error',
    });
  });

  it('saves detail id on trigger', () => {
    expect(performerDetail({}, performerDetailFetch(10))).toMatchObject({
      id: 10,
    });
  });
});
