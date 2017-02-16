import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/app';

import { countAppRequests, isAppReady } from '../selectors/app';
import { getHost } from '../selectors/session';
import { yearCurrent, yearsNotCurrent } from '../selectors/years';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  activeRequests: countAppRequests(state),
  host: getHost(state),
  currentYear: yearCurrent(state),
  years: yearsNotCurrent(state),
  ready: isAppReady(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.APP_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
