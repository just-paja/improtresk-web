import { combineReducers } from 'redux';

import device from './device';
import server from './server';
import years from './years';

export default function createReducer() {
  return combineReducers({
    device,
    server,
    years,
  });
}
