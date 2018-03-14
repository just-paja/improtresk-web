import { connect } from 'react-redux';

import { requireOrderResources, setOrderDefaults } from '../actions';
import {
  getOrderForm,
  getOrderFormProgress,
  getOrderFormPrice,
  getOrderFormAccomodationPrice,
} from '../selectors';
import { getAccomodationList } from '../../accomodation/selectors';
import { getMealList } from '../../food/selectors';
import { formChange, formSubmit } from '../../forms/actions';
import { getWorkshopList } from '../../workshops/selectors';
import { yearActive } from '../../years/selectors';

import OrderForm from '../components/OrderForm';
import mapProgress from '../../containers/mapProgress';

const mapStateToProps = state => ({
  accomodation: getAccomodationList(state),
  formData: getOrderForm(state),
  meals: getMealList(state),
  price: getOrderFormPrice(state),
  priceAccomodation: getOrderFormAccomodationPrice(state),
  workshops: getWorkshopList(state),
  year: yearActive(state),
});

const mapDispatchToProps = {
  onEnter: setOrderDefaults,
  onChange: formChange,
  onSubmit: formSubmit,
};

export default mapProgress(connect(mapStateToProps, mapDispatchToProps)(OrderForm), {
  progressSelector: getOrderFormProgress,
  onResourceChange: requireOrderResources,
});
