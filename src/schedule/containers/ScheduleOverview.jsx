import { connect } from 'react-redux';

import mapProgress from '../../containers/mapProgress';
import Schedule from '../components/ScheduleOverview';

import { yearCurrent } from '../../years/selectors';
import { getScheduleEventList, getScheduleProgress } from '../selectors';
import { requireScheduleEvents } from '../actions';

const mapStateToProps = state => ({
  events: getScheduleEventList(state),
  year: yearCurrent(state),
});

export default mapProgress(connect(mapStateToProps)(Schedule), {
  progressSelector: getScheduleProgress,
  onResourceChange: requireScheduleEvents,
});
