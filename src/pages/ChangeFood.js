import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeFood from './components/ChangeFood';

import { getForm } from '../forms/selectors';
import { getOrderFormPrice, getOrderedMeals } from '../orders/selectors';
import { getParticipant } from '../participants/selectors';

import * as actions from './constants';

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
