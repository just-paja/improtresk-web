import { expect } from 'chai';

import {
  getHost,
  getApiSource,
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
  it('getParticipant returns participant object', () => {
    expect(getParticipant({
      participant: {
        data: {
          id: 1,
        },
      },
    })).to.eql({
      id: 1,
    });
  });
  it('isLoggedIn returns true when participant is logged', () => {
    expect(isLoggedIn({
      participant: {
        data: {
          id: 1,
        },
      },
    })).to.equal(true);
  });
  it('isLoggedIn returns false when participant is not logged', () => {
    expect(isLoggedIn({
      participant: {
        data: null,
      },
    })).to.equal(false);
  });
});
