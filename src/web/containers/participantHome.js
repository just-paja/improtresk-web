import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ParticipantHome from '../components/pages/participant/home';

import { getParticipant } from '../selectors/participant';
import { yearActiveNumber } from '../selectors/years';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  participant: getParticipant(state),
  ready:
    state.participant.details.ready &&
    state.participant.orders.ready,
  yearNumber: yearActiveNumber(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.REQUEST_PARTICIPANT_DETAILS }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantHome);
