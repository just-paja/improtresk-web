import { createSelector } from 'reselect';

import { getParticipantDetail } from '../participants/selectors';

const getSessionState = state => state.session;
const getServerState = state => state.server;

export const getHost =
  createSelector(getServerState, server => `${server.protocol}://${server.host}`);

export const getApiSource =
  createSelector(getSessionState, session => session.apiSource);

export const getApiAuth =
  createSelector(getSessionState, session => session.data);

export const getAutoLoginStatus =
  createSelector(getSessionState, session => session.autoLoginAttempted);

export const isLoggedIn = createSelector(
  getParticipantDetail,
  participant => !!participant
);

export const getEntryPath = createSelector(
  getSessionState,
  state => state.loginRedirect
);
