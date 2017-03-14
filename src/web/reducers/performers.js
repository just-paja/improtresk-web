import { combineReducers } from 'redux';

import detail from './performerDetail';
import list from './performerList';

export default combineReducers({
  detail,
  list,
});
