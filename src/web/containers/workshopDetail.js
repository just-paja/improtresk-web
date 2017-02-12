import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WorkshopDetail from '../components/pages/workshopDetail';

import { workshopsDetail } from '../selectors/workshops';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  workshop: workshopsDetail(state),
  ready: state.workshops.detail.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: workshop => ({ type: actions.WORKSHOP_DETAIL_MOUNTED, workshop }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopDetail);
