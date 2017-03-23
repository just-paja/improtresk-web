import { expect } from 'chai';

import session from '../../../src/web/reducers/session';

describe('Years reducer', () => {
  it('returns default state', () => {
    expect(session()).to.eql({
      apiSource: '',
      autoLoginAttempted: false,
      data: {},
    });
  });
  it('marks login as attempted', () => {
    expect(session({}, { type: 'PARTICIPANT_LOGIN_AUTO' })).to.eql({
      autoLoginAttempted: true,
    });
  });
  it('logs participant in', () => {
    expect(session({}, {
      type: 'PARTICIPANT_LOGIN',
      data: { id: 1, name: 'foo' },
    })).to.eql({
      data: { id: 1, name: 'foo' },
    });
  });
  it('logs participant out', () => {
    expect(session({}, { type: 'PARTICIPANT_TOKEN_REVOKE_START' })).to.eql({
      data: {},
    });
  });
  it('opens magic door', () => {
    expect(session({}, { type: 'idui1raKzie8QuieKei6exeiOhsaeva4vooL4ao3ahx8EiquLoothei3Ha9shaki' })).to.eql({
      forceOpenSignups: true,
    });
  });
});
