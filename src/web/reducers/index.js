import { combineReducers } from 'redux';

import device from './device';
import news from './news';
import server from './server';
import workshopDetail from './workshopDetail';
import workshops from './workshops';
import years from './years';

export default function createReducer() {
  return combineReducers({
    device,
    news,
    server,
    workshopDetail,
    workshops,
    years,
  });
}
