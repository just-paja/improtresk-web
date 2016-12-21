import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Contact from '../components/pages/contact';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  ready: state.years.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.SCHEDULE_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
