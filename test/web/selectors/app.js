import { expect } from 'chai';

import {
  countAppRequests,
  getAppErrors,
  isAppReady,
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
          data: [],
        },
      },
      news: {
        error: undefined,
      },
    })).to.eql(['foo', 'bar']);
  });
  it('getAppErrors all fatal errors', () => {
    expect(getAppErrors({
      accomodation: {
        error: new Error('foo'),
        id: 123,
      },
      workshops: {
        workshopDetail: {
          error: new Error('bar'),
          data: [],
        },
      },
      news: {
        error: undefined,
      },
    })).to.eql(['foo', 'bar']);
  });
  it('isAppReady returns true when all required stuff is ready', () => {
    expect(isAppReady({
      lectors: {
        list: {
          ready: true,
        },
        roles: {
          ready: true,
        },
      },
      workshops: {
        difficulties: {
          ready: true,
        },
      },
      years: {
        ready: true,
      },
    })).to.equal(true);
  });
  it('isAppReady returns false when one is not ready', () => {
    expect(isAppReady({
      lectors: {
        list: {
          ready: true,
        },
        roles: {
          ready: true,
        },
      },
      workshops: {
        difficulties: {
          ready: false,
        },
      },
      years: {
        ready: true,
      },
    })).to.equal(false);
  });
});
