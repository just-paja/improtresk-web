import { combineReducers } from 'redux';

import archive from './yearArchive';
import capacity from './yearCapacity';
import conditions from './yearConditions';
import list from './yearList';

export default combineReducers({
  archive,
  capacity,
  conditions,
  list,
});
