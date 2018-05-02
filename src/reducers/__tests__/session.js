import session from '../session';

import { login, loginWithSignupData } from '../../participants/actions';

describe('Session reducer', () => {
  it('returns default state', () => {
    expect(session()).toEqual({
      apiSource: '',
      autoLoginAttempted: false,
      data: {},
      locale: null,
      loginRedirect: null,
    });
  });

  it('marks login as attempted', () => {
    expect(session({}, { type: 'PARTICIPANT_LOGIN_AUTO' })).toEqual({
      autoLoginAttempted: true,
    });
  });

  it('logs participant in', () => {
    expect(session({}, login.success({ id: 1, name: 'foo' }))).toEqual({
      data: { id: 1, name: 'foo' },
    });
  });

  it('logs participant in', () => {
    expect(session({}, loginWithSignupData.success({ id: 1, name: 'foo' }))).toEqual({
      data: { id: 1, name: 'foo' },
    });
  });

  it('logs participant out', () => {
    expect(session({}, { type: 'PARTICIPANT_TOKEN_REVOKE_START' })).toEqual({
      data: {},
    });
  });

  it('opens magic door', () => {
    expect(session({}, { type: 'idui1raKzie8QuieKei6xx3iOhsaeva4vooL4ao3ahx8EiquLoothei3Ha9shaki' })).toEqual({
      forceOpenSignups: true,
    });
  });
});
