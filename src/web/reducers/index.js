import { combineReducers } from 'redux';

import accomodation from './accomodation';
import archive from './archive';
import conditions from './conditions';
import device from './device';
import forms from './forms';
import meals from './meals';
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
    archive,
    conditions,
    device,
    forms,
    meals,
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
