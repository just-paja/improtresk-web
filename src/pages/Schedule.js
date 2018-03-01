import { connect } from 'react-redux';

import mapPageProgress from './mapPageProgress';
import Schedule from './components/Schedule';

import { getPerformerList } from '../performers/selectors';
import { getScheduleEventList } from '../schedule/selectors';
import { getText } from '../texts/selectors';
import { yearCurrent } from '../years/selectors';
import { getScheduleProgress } from './selectors';

import * as actions from './constants';
import * as texts from '../texts/constants';

const selectIntroText = getText(texts.SCHEDULE_INTRO);

const mapStateToProps = state => ({
  intro: selectIntroText(state),
  performers: getPerformerList(state),
  scheduleEvents: getScheduleEventList(state),
  year: yearCurrent(state),
});

export default mapPageProgress(connect(mapStateToProps)(Schedule), {
  progressSelector: getScheduleProgress,
  onResourceChange: () => ({ type: actions.PAGE_SCHEDULE_ENTERED }),
});
