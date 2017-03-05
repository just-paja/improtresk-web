import { expect } from 'chai';

import {
  countAppRequests,
  getAppErrors,
} from '../../../src/web/selectors/app';

describe('Application selectors', () => {
  it('countAppRequests returns 0 when no request is loading', () => {
    expect(countAppRequests({
      accomodation: {
        loading: false,
      },
      workshops: {
        workshopDetail: {
          loading: null,
        },
      },
    })).to.equal(0);
  });
  it('countAppRequests returns number reducers flagged as loading', () => {
    expect(countAppRequests({
      accomodation: {
        loading: true,
      },
      workshops: {
        workshopDetail: {
          loading: true,
        },
      },
    })).to.equal(2);
  });
  it('getAppErrors all fatal errors', () => {
    expect(getAppErrors({
      accomodation: {
        error: new Error('foo'),
      },
      workshops: {
        workshopDetail: {
          error: new Error('bar'),
        },
      },
      news: {
        error: undefined,
      },
    })).to.eql(['foo', 'bar']);
  });
});
