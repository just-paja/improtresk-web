import { expect } from 'chai';

import {
  getHost,
  getApiSource,
  getApiAuth,
  getAutoLoginStatus,
  getParticipant,
  isLoggedIn,
} from '../../../src/web/selectors/session';

describe('Session selectors', () => {
  it('getHost returns app host', () => {
    expect(getHost({
      server: {
        protocol: 'https',
        host: 'improtresk.cz',
      },
    })).to.equal('https://improtresk.cz');
  });
  it('getApiSource returns app API source', () => {
    expect(getApiSource({
      session: {
        apiSource: 'https://api.improtresk.cz',
      },
    })).to.equal('https://api.improtresk.cz');
  });
  it('getApiAuth returns app API source', () => {
    expect(getApiAuth({
      session: {
        data: {
          token: 'foo',
        },
      },
    })).to.eql({
      token: 'foo',
    });
  });
  it('getAutoLoginStatus returns app API source', () => {
    expect(getAutoLoginStatus({
      session: {
        autoLoginAttempted: true,
      },
    })).to.equal(true);
  });
  it('getParticipant returns participant object', () => {
    expect(getParticipant({
      participant: {
        details: {
          data: {
            id: 1,
          },
        },
      },
    })).to.eql({
      id: 1,
    });
  });
  it('isLoggedIn returns true when participant is logged', () => {
    expect(isLoggedIn({
      participant: {
        details: {
          data: {
            id: 1,
          },
        },
      },
    })).to.equal(true);
  });
  it('isLoggedIn returns false when participant is not logged', () => {
    expect(isLoggedIn({
      participant: {
        details: {
          data: null,
        },
      },
    })).to.equal(false);
  });
});
