import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/app';

import { yearsAll } from '../selectors/years';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  years: yearsAll(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.APP_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
