import { createSelector } from 'reselect';

const getSessionState = state => state.session;

export const getApiSource =
  createSelector(getSessionState, session => session.apiSource);

export default { getApiSource };
