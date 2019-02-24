import { connect } from 'react-redux'

import { orderListFetch } from '../actions'
import { getOrderList, getOrderListProgress } from '../selectors'

import ImprovAge from '../components/ImprovAge'
import mapProgress from '../../containers/mapProgress'

const mapStateToProps = state => ({
  orders: getOrderList(state)
})

export default mapProgress(connect(mapStateToProps)(ImprovAge), {
  progressSelector: getOrderListProgress,
  onResourceChange: orderListFetch
})
