import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeFood from '../../components/pages/participant/changeFood';

import { getForm } from '../../selectors/forms';
import { getOrderFormPrice, getOrderedMeals } from '../../selectors/orders';
import { getParticipant } from '../../selectors/participant';

import * as actions from '../../constants/actions';

const mapStateToProps = state => ({
  price: getOrderFormPrice(state),
  meals: getOrderedMeals(state),
  changeFood: getForm(state, 'changeFood'),
  participant: getParticipant(state),
  ready:
    state.participant.details.ready &&
    state.participant.orders.ready &&
    state.meals.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChangeFoodChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onChangeFoodSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
  onMount: () => ({ type: actions.PARTICIPANT_FOOD_CHANGE_MOUNTED }),
  onUnmount: () => ({ type: actions.PARTICIPANT_FOOD_CHANGE_UNMOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangeFood);
