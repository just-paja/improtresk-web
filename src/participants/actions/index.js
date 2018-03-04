import * as constants from '../constants';

export const requireParticipant = () => ({
  type: constants.PARTICIPANT_LOGIN,
});

export const logout = () => ({
  type: constants.PARTICIPANT_LOGOUT,
});