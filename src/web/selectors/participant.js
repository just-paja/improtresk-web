import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getParticipantState = state => state.participant;

export const shouldFetchParticipant = createSelector(
  getParticipantState,
  isStateValid
);

export default { shouldFetchParticipant };
