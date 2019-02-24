import { combineReducers } from 'redux'

import geocode from './geocode'
import list from './locationList'

export default combineReducers({
  geocode,
  list
})
