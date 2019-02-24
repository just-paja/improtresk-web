import { combineReducers } from 'redux'

import detail from './orderDetail'
import list from './orderList'

export default combineReducers({
  detail,
  list
})
