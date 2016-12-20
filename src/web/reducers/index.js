import { combineReducers } from 'redux';

import device from './device';
import server from './server';

export default function createReducer() {
  return combineReducers({
    device,
    server,
  });
}
