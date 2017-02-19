import { combineReducers } from 'redux';

import workshopDetail from './workshopDetail';
import workshopDifficulties from './workshopDifficulties';
import workshopList from './workshopList';
import workshopLocations from './workshopLocations';

export default combineReducers({
  detail: workshopDetail,
  difficulties: workshopDifficulties,
  list: workshopList,
  locations: workshopLocations,
});
