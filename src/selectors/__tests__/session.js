import {
  getHost,
  getApiSource,
  getApiAuth,
  getAutoLoginStatus,
  isLoggedIn,
} from '../session';

describe('Session selectors', () => {
  it('getHost returns app host', () => {
    expect(getHost({
      server: {
        protocol: 'https',
        host: 'improtresk.cz',
      },
    })).toBe('https://improtresk.cz');
  });

  it('getApiSource returns app API source', () => {
    expect(getApiSource({
      session: {
        apiSource: 'https://api.improtresk.cz',
      },
    })).toBe('https://api.improtresk.cz');
  });

  it('getApiAuth returns app API source', () => {
    expect(getApiAuth({
      session: {
        data: {
          token: 'foo',
        },
      },
    })).toEqual({
      token: 'foo',
    });
  });

  it('getAutoLoginStatus returns app API source', () => {
    expect(getAutoLoginStatus({
      session: {
        autoLoginAttempted: true,
      },
    })).toBe(true);
  });

  it('isLoggedIn returns true when participant is logged', () => {
    expect(isLoggedIn({
      participants: {
        detail: {
          data: {
            id: 1,
          },
        },
      },
    })).toBe(true);
  });

  it('isLoggedIn returns false when participant is not logged', () => {
    expect(isLoggedIn({
      participants: {
        detail: {
          data: null,
        },
      },
    })).toBe(false);
  });
});
