import { combineReducers } from 'redux';

import accomodation from './accomodation';
import archive from './archive';
import conditions from './conditions';
import device from './device';
import forms from './forms';
import geocode from './geocode';
import lectors from './lectors';
import meals from './meals';
import news from './news';
import server from './server';
import session from './session';
import texts from './texts';
import tips from './tips';
import workshops from './workshops';
import years from './years';

export default function createReducer() {
  return combineReducers({
    accomodation,
    archive,
    conditions,
    device,
    forms,
    geocode,
    lectors,
    meals,
    news,
    server,
    session,
    texts,
    tips,
    workshops,
    years,
  });
}
