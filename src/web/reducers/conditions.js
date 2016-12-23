import { combineReducers } from 'redux';
import currentConditions from './currentConditions';

export default combineReducers({
  current: currentConditions,
});
