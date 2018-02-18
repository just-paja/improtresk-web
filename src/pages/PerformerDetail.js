import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PerformerDetail from '../components/pages/performerDetail';

import { getPerformerDetail } from '../selectors/performers';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  performer: getPerformerDetail(state),
  ready: state.years.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: performer => ({ type: actions.PERFORMER_DETAIL_MOUNTED, performer }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PerformerDetail);
