import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getParticipantDetailsState = state => state.participant.details;
const getParticipantOrdersState = state => state.participant.orders;

export const shouldFetchParticipant = createSelector(
  getParticipantDetailsState,
  isStateValid
);

export const shouldFetchParticipantOrders = createSelector(
  getParticipantOrdersState,
  isStateValid
);

export const getParticipant = createSelector(
  getParticipantDetailsState,
  state => state.data
);
