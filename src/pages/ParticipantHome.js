import { connect } from 'react-redux';

import ParticipantHome from './components/ParticipantHome';
import mapPageProgress from './mapPageProgress';

import { getParticipantDetail } from '../participants/selectors';

import { getParticipantHomeProgress } from './selectors';
import { yearActiveNumber } from '../years/selectors';

import * as actions from './constants';

const mapStateToProps = state => ({
  participant: getParticipantDetail(state),
  yearNumber: yearActiveNumber(state),
});

export default mapPageProgress(connect(mapStateToProps)(ParticipantHome), {
  progressSelector: getParticipantHomeProgress,
  onResourceChange: () => ({ type: actions.PAGE_PARTICIPANT_HOME_ENTERED }),
});
