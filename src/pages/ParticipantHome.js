import { connect } from 'react-redux';

import ParticipantHome from './components/ParticipantHome';
import mapPageProgress from './mapPageProgress';

import { formChange, formSubmit } from '../forms/actions';
import { getForm } from '../forms/selectors';
import { getMeals } from '../food/selectors';
import { getOrderFormPrice, getOrderedMeals } from '../orders/selectors';
import { getParticipant, getParticipantLatestOrder } from '../participants/selectors';
import { getAccomodationList } from '../accomodation/selectors';
import { workshopsAll } from '../workshops/selectors';
import { getFoodOrdersCloseDate, yearActiveNumber } from '../years/selectors';

import { getParticipantHomeProgress } from './selectors';

import * as actions from './constants';

const mapStateToProps = state => ({
  accomodation: getAccomodationList(state),
  foodPickCloseDate: getFoodOrdersCloseDate(state),
  price: getOrderFormPrice(state),
  meals: getOrderedMeals(state),
  mealsAvailable: getMeals(state),
  order: getParticipantLatestOrder(state),
  orderForm: getForm(state, 'order'),
  participant: getParticipant(state),
  workshops: workshopsAll(state),
  yearNumber: yearActiveNumber(state),
});

const mapDispatchToProps = {
  onWorkshopPickerChange: formChange,
  onWorkshopPickerSubmit: formSubmit,
};

export default mapPageProgress(connect(mapStateToProps, mapDispatchToProps)(ParticipantHome), {
  progressSelector: getParticipantHomeProgress,
  onResourceChange: () => ({ type: actions.PAGE_PARTICIPANT_HOME_ENTERED }),
});
