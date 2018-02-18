import { isRequired, transformData } from 'react-saga-rest';

const getTeamListState = state => state.participants.teams;

export const getTeamOptions = transformData(getTeamListState, {
  transformers: [
    team => ({
      label: team.name,
      value: team.name,
    }),
  ],
});

export const isTeamListRequired = isRequired(getTeamListState);
