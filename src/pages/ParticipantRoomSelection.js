import { connect } from 'react-redux';

import ParticipantRoomSelection from './components/ParticipantRoomSelection';
import mapPageProgress from './mapPageProgress';

import { getParticipantHomeProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = () => ({});

export default mapPageProgress(connect(mapStateToProps)(ParticipantRoomSelection), {
  progressSelector: getParticipantHomeProgress,
  onResourceChange: () => ({ type: constants.PAGE_PARTICIPANT_HOME_ENTERED }),
});
