import list from '../accomodationList';

import { accomodationListFetch } from '../../actions';

describe('accomodationList reducer', () => {
  it('returns default state', () => {
    expect(list()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on request', () => {
    expect(list({}, accomodationListFetch.request())).toMatchObject({
      loading: true,
    });
  });

  it('marks as loading on success', () => {
    expect(list(
      {},
      accomodationListFetch.success([
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
    expect(list({}, accomodationListFetch.failure('error'))).toMatchObject({
      error: 'error',
    });
  });
});
