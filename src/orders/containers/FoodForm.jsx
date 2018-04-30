import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { foodChange, requireOrderResources } from '../actions';
import {
  getOrderFoodFormDefaults,
  getOrderFormProgress,
  getOrderFormPrice,
} from '../selectors';
import { getAccomodationList } from '../../accomodation/selectors';
import { getMealList } from '../../food/selectors';
import { getWorkshopList } from '../../workshops/selectors';
import { yearActive } from '../../years/selectors';

import FoodForm from '../components/FoodForm';
import mapProgress from '../../containers/mapProgress';

const validate = (values) => {
  const errors = {};
  if (!values.accomodation) {
    errors.accomodation = 'forms.fieldRequired';
  }
  return errors;
};

const mapStateToProps = state => ({
  accomodation: getAccomodationList(state),
  initialValues: getOrderFoodFormDefaults(state),
  meals: getMealList(state),
  price: getOrderFormPrice(state),
  workshops: getWorkshopList(state),
  year: yearActive(state),
});

const mapDispatchToProps = {
  onSubmit: foodChange,
};

const formContainer = reduxForm({
  form: foodChange.form,
  validate,
})(FoodForm);

formContainer.displayName = 'FoodForm';

const container = mapProgress(connect(mapStateToProps, mapDispatchToProps)(formContainer), {
  progressSelector: getOrderFormProgress,
  onResourceChange: requireOrderResources,
});

container.displayName = 'ContainerProgress(Connect(FoodForm))';

export default container;
