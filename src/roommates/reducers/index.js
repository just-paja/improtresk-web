import { combineReducers } from 'redux'

import rooms from './roomList'
import roomSelection from './roomSelection'

export default combineReducers({
  rooms,
  roomSelection
})
