import { combineReducers } from 'redux';

import detail from './workshopDetail';
import difficulties from './workshopDifficulties';
import lectors from './lectors';
import list from './workshopList';

export default combineReducers({
  detail,
  difficulties,
  lectors,
  list,
});
