import { expect } from 'chai';

import {
  getTeamOptions,
  shouldFetchTeams,
} from '../../../src/web/selectors/teams';

describe('Team selectors', () => {
  it('shouldFetchTeams returns true when valid', () => {
    expect(shouldFetchTeams({
      teams: {
        valid: true,
      },
    })).to.equal(true);
  });
  it('shouldFetchTeams returns false when invalid', () => {
    expect(shouldFetchTeams({
      teams: {
        valid: false,
      },
    })).to.equal(false);
  });

  it('getTeamOptions returns options for team select input', () => {
    expect(getTeamOptions({
      teams: {
        data: [
          { name: 'foo' },
          { name: 'bar' },
        ],
      },
    })).to.eql([
      { label: 'foo', value: 'foo' },
      { label: 'bar', value: 'bar' },
    ]);
  });
});
