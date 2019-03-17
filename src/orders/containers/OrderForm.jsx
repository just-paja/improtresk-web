import { getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { orderCreate, requireOrderResources } from '../actions'
import {
  getOrderFormDefaults,
  getOrderFormProgress,
  getOrderFormPrice
} from '../selectors'
import { getAccomodationList } from '../../accomodation/selectors'
import { getMealList } from '../../food/selectors'
import { getWorkshopList } from '../../workshops/selectors'
import { yearActive } from '../../years/selectors'

import OrderForm from '../components/OrderForm'
import mapProgress from '../../containers/mapProgress'

const validate = (values, props) => {
  const errors = {}
  if (!values.accomodation) {
    errors.accomodation = 'forms.fieldRequired'
  }
  if (props.year && !props.year.withoutWorkshop && !values.workshop) {
    errors.workshop = 'forms.fieldRequired'
  }
  return errors
}

const getWorkshopValue = getFormValues(orderCreate.form)

const mapStateToProps = (state) => {
  const values = getWorkshopValue(state)
  return ({
    accomodation: getAccomodationList(state),
    initialValues: getOrderFormDefaults(state),
    meals: getMealList(state),
    price: getOrderFormPrice(state),
    workshopValue: values && values.workshop,
    workshops: getWorkshopList(state),
    year: yearActive(state)
  })
}

const mapDispatchToProps = {
  onSubmit: orderCreate
}

export default mapProgress(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: orderCreate.form,
  validate
})(OrderForm)), {
  progressSelector: getOrderFormProgress,
  onResourceChange: requireOrderResources
})
