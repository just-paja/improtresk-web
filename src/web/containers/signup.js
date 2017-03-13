import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Signup from '../components/pages/signup';

import { yearCurrent } from '../selectors/years';
import { getForm } from '../selectors/forms';
import { getTeamOptions } from '../selectors/teams';
import {
  areSignupsClosed,
  areSignupsOpen,
  getSignupsCloseDate,
  getSignupsOpenDate,
} from '../selectors/signups';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  login: getForm(state, 'login'),
  signup: getForm(state, 'signup'),
  signupsCloseDate: getSignupsCloseDate(state),
  signupsClosed: areSignupsClosed(state),
  signupsOpen: areSignupsOpen(state),
  signupsOpenDate: getSignupsOpenDate(state),
  ready: state.years.ready,
  revalidate: state.session.revalidated,
  teams: getTeamOptions(state),
  year: yearCurrent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoginChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onLoginSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
  onSignupsChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onSignupsOpen: () => ({ type: actions.SIGNUPS_OPEN }),
  onSignupsSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
  onMount: () => ({ type: actions.SIGNUP_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
