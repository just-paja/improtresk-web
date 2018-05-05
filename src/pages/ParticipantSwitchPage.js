import { connect } from 'react-redux';

import ParticipantSwitchPage from './components/ParticipantSwitchPage';
import mapPageProgress from './mapPageProgress';

import { getParticipantHomeProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = () => ({});

export default mapPageProgress(connect(mapStateToProps)(ParticipantSwitchPage), {
  progressSelector: getParticipantHomeProgress,
  onResourceChange: () => ({ type: constants.PAGE_PARTICIPANT_HOME_ENTERED }),
});
