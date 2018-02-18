import { combineReducers } from 'redux';

import detail from './newsDetail';
import list from './newsList';

export default combineReducers({
  detail,
  list,
});
