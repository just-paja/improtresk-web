import * as constants from '../constants';
import * as api from '../../api';

import {
  createRoutine,
  createFormRoutine,
  createRedirectRoutine,
} from '../../routines';

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

export const signupsOpen = () => ({
  type: constants.SIGNUPS_OPEN,
});

export const teamsRequired = () => ({
  type: constants.TEAMS_REQUIRED,
});

export const changePassword = createFormRoutine(constants.FORM_CHANGE_PASSWORD, api.changePassword);
export const login = createFormRoutine(constants.FORM_LOGIN, api.login);
export const loginWithSignupData = createRoutine(constants.PARTICIPANT_LOGIN_DIRECT, api.login);
export const newPassword = createFormRoutine(constants.FORM_NEW_PASSWORD, api.newPassword);
export const redirectHome = createRedirectRoutine('participantHome');
export const resetPassword = createFormRoutine(constants.FORM_RESET_PASSWORD, api.resetPassword);
export const signup = createFormRoutine(constants.FORM_SIGNUP, api.signup);
