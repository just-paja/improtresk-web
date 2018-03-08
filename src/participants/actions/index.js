import * as constants from '../constants';

export const requireParticipant = () => ({
  type: constants.PARTICIPANT_LOGIN,
});

export const setAuthKey = data => ({
  type: constants.PARTICIPANT_LOGIN,
  data,
});

export const logout = () => ({
  type: constants.PARTICIPANT_LOGOUT,
});
