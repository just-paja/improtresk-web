import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import mapPageProgress from './mapPageProgress';
import Signup from './components/Signup';

import { yearCurrent } from '../years/selectors';
import { getSignupPageProgress } from './selectors';
import { signupsOpen } from '../participants/actions';
import { setLoginRedirect } from '../actions';
import {
  areSignupsClosed,
  areSignupsOpen,
  getSignupsCloseDate,
  getSignupsOpenDate,
  getTeamOptions,
} from '../participants/selectors';


import * as actions from './constants';

const mapStateToProps = state => ({
  signupsCloseDate: getSignupsCloseDate(state),
  signupsClosed: areSignupsClosed(state),
  signupsOpen: areSignupsOpen(state),
  signupsOpenDate: getSignupsOpenDate(state),
  teams: getTeamOptions(state),
  translate: getTranslate(state.locale),
  year: yearCurrent(state),
});

const mapDispatchToProps = {
  onSignupsOpen: signupsOpen,
  onRedirectSet: setLoginRedirect,
};

export default mapPageProgress(connect(mapStateToProps, mapDispatchToProps)(Signup), {
  progressSelector: getSignupPageProgress,
  onResourceChange: () => ({ type: actions.PAGE_SIGNUP_ENTERED }),
});
