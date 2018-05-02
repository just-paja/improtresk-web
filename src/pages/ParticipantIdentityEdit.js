import { connect } from 'react-redux';

import ParticipantIdentityEdit from './components/ParticipantIdentityEdit';
import mapPageProgress from './mapPageProgress';

import { getParticipantHomeProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = () => ({});

export default mapPageProgress(connect(mapStateToProps)(ParticipantIdentityEdit), {
  progressSelector: getParticipantHomeProgress,
  onResourceChange: () => ({ type: constants.PAGE_PARTICIPANT_HOME_ENTERED }),
});
