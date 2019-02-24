import { combineReducers } from 'redux'

import archive from './yearArchive'
import capacity from './yearCapacity'
import list from './yearList'
import rules from './yearRules'

export default combineReducers({
  archive,
  capacity,
  list,
  rules
})
