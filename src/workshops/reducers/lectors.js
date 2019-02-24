import { combineReducers } from 'redux'

import lectorList from './lectorList'
import lectorRoles from './lectorRoles'

export default combineReducers({
  list: lectorList,
  roles: lectorRoles
})
