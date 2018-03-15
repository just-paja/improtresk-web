import { connect } from 'react-redux';

import PerformerDetail from '../components/PerformerDetail';
import mapProgress from '../../containers/mapProgress';

import { getPerformerDetail, getPerformerDetailProgress } from '../selectors';
import { requirePerformerDetail } from '../actions';

const mapStateToProps = state => ({
  performer: getPerformerDetail(state),
});

export default mapProgress(connect(mapStateToProps)(PerformerDetail), {
  matchParam: 'slug',
  progressSelector: getPerformerDetailProgress,
  onResourceChange: requirePerformerDetail,
});
