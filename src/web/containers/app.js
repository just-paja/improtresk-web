import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/app';

import {
  countAppRequests,
  getAppErrors,
  isAppReady,
} from '../selectors/app';
import { getHost, getParticipant } from '../selectors/session';
import { yearCurrent, yearsNotCurrent } from '../selectors/years';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  activeRequests: countAppRequests(state),
  errors: getAppErrors(state),
  host: getHost(state),
  currentYear: yearCurrent(state),
  participant: getParticipant(state),
  years: yearsNotCurrent(state),
  ready: isAppReady(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.APP_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
