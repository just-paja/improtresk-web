import * as selectors from '..';

describe('Team selectors', () => {
  it('isTeamListRequired returns false when valid', () => {
    expect(selectors.isTeamListRequired({
      participants: {
        teams: {
          valid: true,
        },
      },
    })).toBe(false);
  });

  it('isTeamListRequired returns true when invalid', () => {
    expect(selectors.isTeamListRequired({
      participants: {
        teams: {
          valid: false,
        },
      },
    })).toBe(true);
  });

  it('getTeamOptions returns options for team select input', () => {
    expect(selectors.getTeamOptions({
      participants: {
        teams: {
          data: [
            { name: 'foo' },
            { name: 'bar' },
          ],
        },
      },
    })).toEqual([
      { label: 'foo', value: 'foo' },
      { label: 'bar', value: 'bar' },
    ]);
  });
});
