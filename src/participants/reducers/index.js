import { combineReducers } from 'redux'

import detail from './participantDetail'
import teams from './teams'

export default combineReducers({
  detail,
  teams
})
