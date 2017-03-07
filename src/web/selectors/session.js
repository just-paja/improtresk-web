import { createSelector } from 'reselect';

const getParticipantState = state => state.participant;
const getSessionState = state => state.session;
const getServerState = state => state.server;

export const getHost =
  createSelector(getServerState, server => `${server.protocol}://${server.host}`);

export const getApiSource =
  createSelector(getSessionState, session => session.apiSource);

export const isLoggedIn = createSelector(
  getParticipantState,
  participant => !!participant.data
);
