import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getTeamsState = state => state.teams;

export const getTeamOptions = createSelector(
  getTeamsState,
  teams => teams.data.map(team => ({
    label: team.name,
    value: team.name,
  }))
);

export const shouldFetchTeams = createSelector(
  getTeamsState,
  isStateValid
);
