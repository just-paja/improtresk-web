import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ParticipantHome from '../components/pages/participant/home';

import { getForm } from '../selectors/forms';
import { getOrderFormPrice } from '../selectors/orders';
import {
  getParticipant,
  getParticipantLatestOrder,
 } from '../selectors/participant';
import { accomodationAll } from '../selectors/accomodation';
import { getMeals } from '../selectors/food';
import { workshopsAll } from '../selectors/workshops';
import { yearActiveNumber } from '../selectors/years';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  accomodation: accomodationAll(state),
  price: getOrderFormPrice(state),
  meals: getMeals(state),
  order: getParticipantLatestOrder(state),
  orderForm: getForm(state, 'order'),
  participant: getParticipant(state),
  ready:
    state.participant.details.ready &&
    state.participant.orders.ready &&
    state.workshops.list.ready,
  workshops: workshopsAll(state),
  yearNumber: yearActiveNumber(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onLogout: () => ({ type: actions.PARTICIPANT_LOGOUT }),
  onMount: () => ({ type: actions.REQUEST_PARTICIPANT_DETAILS }),
  onOrderCancel: () => ({ type: actions.ORDER_CANCEL_REQUESTED }),
  onOrderConfirm: () => ({ type: actions.ORDER_CONFIRM_REQUESTED }),
  onOrderMount: () => ({ type: actions.ORDER_FORM_MOUNTED }),
  onOrderUnmount: () => ({ type: actions.ORDER_FORM_UNMOUNTED }),
  onWorkshopPickerChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onWorkshopPickerSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantHome);
