import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import mapPageProgress from './mapPageProgress';
import Signup from './components/Signup';

import { formChange, formSubmit } from '../forms/actions';

import { yearCurrent } from '../years/selectors';
import { getSignupPageProgress } from './selectors';
import {
  areSignupsClosed,
  areSignupsOpen,
  getLoginForm,
  getSignupForm,
  getSignupsCloseDate,
  getSignupsOpenDate,
  getTeamOptions,
} from '../participants/selectors';


import * as actions from './constants';

const mapStateToProps = state => ({
  login: getLoginForm(state),
  signup: getSignupForm(state),
  signupsCloseDate: getSignupsCloseDate(state),
  signupsClosed: areSignupsClosed(state),
  signupsOpen: areSignupsOpen(state),
  signupsOpenDate: getSignupsOpenDate(state),
  teams: getTeamOptions(state),
  translate: getTranslate(state.locale),
  year: yearCurrent(state),
});

const mapDispatchToProps = {
  onLoginChange: formChange,
  onLoginSubmit: formSubmit,
  onSignupsChange: formChange,
  onSignupsOpen: () => ({ type: actions.SIGNUPS_OPEN }),
  onSignupsSubmit: formSubmit,
};

export default mapPageProgress(connect(mapStateToProps, mapDispatchToProps)(Signup), {
  progressSelector: getSignupPageProgress,
  onResourceChange: () => ({ type: actions.PAGE_SIGNUP_ENTERED }),
});
