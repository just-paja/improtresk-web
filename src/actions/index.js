import * as constants from '../constants';

export const setLoginRedirect = path => ({
  type: constants.SET_LOGIN_REDIRECT,
  path,
});

export default { setLoginRedirect };
