import { connect } from 'react-redux';

import ParticipantHome from './components/ParticipantHome';
import mapPageProgress from './mapPageProgress';

import { logout } from '../participants/actions';
import { getParticipantDetail } from '../participants/selectors';

import { getParticipantHomeProgress } from './selectors';
import { yearActiveNumber } from '../years/selectors';

import * as constants from './constants';

const mapStateToProps = state => ({
  participant: getParticipantDetail(state),
  yearNumber: yearActiveNumber(state),
});

const mapDispatchToProps = {
  onLogout: logout,
};

export default mapPageProgress(connect(mapStateToProps, mapDispatchToProps)(ParticipantHome), {
  progressSelector: getParticipantHomeProgress,
  onResourceChange: () => ({ type: constants.PAGE_PARTICIPANT_HOME_ENTERED }),
});
