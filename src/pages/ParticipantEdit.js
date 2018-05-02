import { connect } from 'react-redux';

import ParticipantEdit from './components/ParticipantEdit';
import mapPageProgress from './mapPageProgress';

import { getParticipantHomeProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = () => ({});

export default mapPageProgress(connect(mapStateToProps)(ParticipantEdit), {
  progressSelector: getParticipantHomeProgress,
  onResourceChange: () => ({ type: constants.PAGE_PARTICIPANT_HOME_ENTERED }),
});
