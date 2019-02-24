import { combineReducers } from 'redux'

import list from './textList'
import tips from './tips'

export default combineReducers({
  list,
  tips
})
