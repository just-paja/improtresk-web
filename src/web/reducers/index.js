import { combineReducers } from 'redux';

import accomodation from './accomodation';
import conditions from './conditions';
import device from './device';
import foodTimes from './foodTimes';
import news from './news';
import server from './server';
import texts from './texts';
import tips from './tips';
import workshopDetail from './workshopDetail';
import workshops from './workshops';
import years from './years';

export default function createReducer() {
  return combineReducers({
    accomodation,
    conditions,
    device,
    foodTimes,
    news,
    server,
    texts,
    tips,
    workshopDetail,
    workshops,
    years,
  });
}
