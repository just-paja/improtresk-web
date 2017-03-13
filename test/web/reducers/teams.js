import { expect } from 'chai';

import teams from '../../../src/web/reducers/teams';

describe('Teams reducer', () => {
  it('returns default state', () => {
    expect(teams()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on TEAMS_FETCH_STARTED', () => {
    expect(teams({}, { type: 'TEAMS_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on TEAMS_FETCH_SUCCESS', () => {
    expect(teams(
      {},
      {
        type: 'TEAMS_FETCH_SUCCESS',
        data: [
          { name: 'foo' },
        ],
      }
    )).to.eql({
      loading: false,
      ready: true,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });

  it('marks as loading on TEAMS_FETCH_ERROR', () => {
    expect(teams({}, { type: 'TEAMS_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
