import { combineReducers } from 'redux';

import workshopDetail from './workshopDetail';
import workshopList from './workshopList';

export default combineReducers({
  detail: workshopDetail,
  list: workshopList,
});
