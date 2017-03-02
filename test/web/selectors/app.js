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
    const error1 = new Error('foo');
    const error2 = new Error('bar');
    expect(getAppErrors({
      accomodation: {
        error: error1,
      },
      workshops: {
        workshopDetail: {
          error: error2,
        },
      },
    })).to.eql([
      error1,
      error2,
    ]);
  });
});
