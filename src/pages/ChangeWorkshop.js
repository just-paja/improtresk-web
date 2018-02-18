import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeWorkshop from '../../components/pages/participant/changeWorkshop';

import { getForm } from '../../selectors/forms';
import { getOrderFormPrice } from '../../selectors/orders';
import {
  getParticipant,
  getParticipantLatestOrder,
} from '../../selectors/participant';
import { workshopsAll } from '../../selectors/workshops';
import { yearActiveNumber } from '../../selectors/years';

import * as actions from '../../constants/actions';

const mapStateToProps = state => ({
  price: getOrderFormPrice(state),
  order: getParticipantLatestOrder(state),
  changeWorkshop: getForm(state, 'changeWorkshop'),
  participant: getParticipant(state),
  ready:
    state.participant.details.ready &&
    state.participant.orders.ready &&
    state.workshops.list.ready,
  workshops: workshopsAll(state),
  yearNumber: yearActiveNumber(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChangeWorkshopChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onChangeWorkshopSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
  onMount: () => ({ type: actions.PAGE_WORKSHOP_CHANGE_ENTERED }),
  onUnmount: () => ({ type: actions.PAGE_WORKSHOP_CHANGE_LEFT }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangeWorkshop);
