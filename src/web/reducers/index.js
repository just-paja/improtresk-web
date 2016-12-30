import { combineReducers } from 'redux';

import accomodation from './accomodation';
import conditions from './conditions';
import device from './device';
import foodTimes from './foodTimes';
import forms from './forms';
import news from './news';
import server from './server';
import session from './session';
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
    forms,
    foodTimes,
    news,
    server,
    session,
    texts,
    tips,
    workshopDetail,
    workshops,
    years,
  });
}
