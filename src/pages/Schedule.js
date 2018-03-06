import { connect } from 'react-redux';

import mapPageProgress from './mapPageProgress';
import Schedule from './components/Schedule';

import { getPerformerList } from '../performers/selectors';
import { getScheduleEventList } from '../schedule/selectors';
import { yearCurrent } from '../years/selectors';
import { getScheduleProgress } from './selectors';

import * as actions from './constants';

const mapStateToProps = state => ({
  performers: getPerformerList(state),
  scheduleEvents: getScheduleEventList(state),
  year: yearCurrent(state),
});

export default mapPageProgress(connect(mapStateToProps)(Schedule), {
  progressSelector: getScheduleProgress,
  onResourceChange: () => ({ type: actions.PAGE_SCHEDULE_ENTERED }),
});
