import { combineReducers } from 'redux';

import device from './device';
import conditions from './conditions';
import news from './news';
import server from './server';
import tips from './tips';
import workshopDetail from './workshopDetail';
import workshops from './workshops';
import years from './years';

export default function createReducer() {
  return combineReducers({
    conditions,
    device,
    news,
    server,
    tips,
    workshopDetail,
    workshops,
    years,
  });
}
