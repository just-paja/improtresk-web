import { connect } from 'react-redux'

import { orderCancel, orderConfirm, orderListFetch } from '../actions'
import { getActiveOrder, getOrderListProgress } from '../selectors'
import { getRegistrationCloseDate, isFoodPickingAllowed } from '../../years/selectors'

import RegistrationStatus from '../components/RegistrationStatus'
import mapProgress from '../../containers/mapProgress'

const mapStateToProps = state => ({
  activeOrder: getActiveOrder(state),
  registrationsCloseDate: getRegistrationCloseDate(state),
  isFoodPickingAllowed: isFoodPickingAllowed(state)
})

const mapDispatchToProps = {
  onConfirm: orderConfirm,
  onCancel: orderCancel
}

export default mapProgress(connect(mapStateToProps, mapDispatchToProps)(RegistrationStatus), {
  progressSelector: getOrderListProgress,
  onResourceChange: orderListFetch
})
