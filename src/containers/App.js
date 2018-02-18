import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/App';

import {
  countAppRequests,
  getAppErrors,
  getAppProgress,
} from '../selectors/app';
import { getHost, getLang } from '../selectors';
import { getParticipantDetail } from '../participants/selectors';
import { yearCurrent, yearsNotCurrent } from '../years/selectors';

import * as actions from '../constants';

const mapStateToProps = state => ({
  activeRequests: countAppRequests(state),
  currentYear: yearCurrent(state),
  errors: getAppErrors(state),
  host: getHost(state),
  lang: getLang(state),
  participant: getParticipantDetail(state),
  progress: getAppProgress(state),
  years: yearsNotCurrent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.APP_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
