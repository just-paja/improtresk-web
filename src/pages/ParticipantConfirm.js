import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ParticipantConfirm from '../components/pages/participant/confirm';

import {
  getParticipant,
  getParticipantUnconfirmedOrder,
} from '../selectors/participant';
import { yearActive } from '../selectors/years';
import { getOrderedMeals } from '../selectors/orders';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  order: getParticipantUnconfirmedOrder(state),
  meals: getOrderedMeals(state),
  participant: getParticipant(state),
  year: yearActive(state),
  ready:
    state.participant.orders.ready &&
    state.workshops.list.ready &&
    state.years.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.REQUEST_PARTICIPANT_DETAILS }),
  onOrderCancel: () => ({ type: actions.ORDER_CANCEL_REQUESTED }),
  onOrderConfirm: () => ({ type: actions.ORDER_CONFIRM_REQUESTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantConfirm);
