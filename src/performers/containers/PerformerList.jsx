import { connect } from 'react-redux';

import PerformerList from '../components/PerformerList';
import mapProgress from '../../containers/mapProgress';

import { getPerformerList, getPerformerListProgress } from '../selectors';
import { performerListFetch } from '../actions';

const mapStateToProps = state => ({
  performerList: getPerformerList(state),
});

export default mapProgress(connect(mapStateToProps)(PerformerList), {
  progressSelector: getPerformerListProgress,
  onResourceChange: performerListFetch,
});
