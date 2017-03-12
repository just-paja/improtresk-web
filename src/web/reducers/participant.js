import { combineReducers } from 'redux';

import details from './participantDetails';
import orders from './participantOrders';

export default combineReducers({
  details,
  orders,
});
