import { connect } from 'react-redux';

import { requireOrderResources } from '../actions';
import { getOrderForm, getOrderFormProgress } from '../selectors';
import { getAccomodationList } from '../../accomodation/selectors';
import { getMealList } from '../../food/selectors';
import { formChange, formSubmit } from '../../forms/actions';
import { getWorkshopList } from '../../workshops/selectors';

import OrderForm from '../components/OrderForm';
import mapProgress from '../../containers/mapProgress';

const mapStateToProps = state => ({
  accomodation: getAccomodationList(state),
  meals: getMealList(state),
  workshops: getWorkshopList(state),
  formData: getOrderForm(state),
});

const mapDispatchToProps = {
  onChange: formChange,
  onSubmit: formSubmit,
};

export default mapProgress(connect(mapStateToProps, mapDispatchToProps)(OrderForm), {
  progressSelector: getOrderFormProgress,
  onResourceChange: requireOrderResources,
});
