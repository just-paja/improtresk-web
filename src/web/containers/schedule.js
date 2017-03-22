import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Schedule from '../components/pages/schedule';

import { getPerformers } from '../selectors/performers';
import { getScheduleEvents } from '../selectors/schedule';
import { yearCurrent } from '../selectors/years';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  performers: getPerformers(state),
  ready:
    state.performers.list.ready &&
    state.schedule.ready &&
    state.years.ready,
  scheduleEvents: getScheduleEvents(state),
  year: yearCurrent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.SCHEDULE_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
