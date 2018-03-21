import newsList from '../newsList';

import { newsListFetch } from '../../actions';

describe('newsList reducer', () => {
  it('returns default state', () => {
    expect(newsList()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on request', () => {
    expect(newsList({}, newsListFetch.request())).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on success', () => {
    expect(newsList(
      {},
      newsListFetch.success([
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
    expect(newsList({}, newsListFetch.failure('error'))).toMatchObject({
      error: 'error',
    });
  });
});
