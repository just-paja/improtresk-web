import { combineReducers } from 'redux';

import accomodation from './accomodation';
import archive from './archive';
import capacity from './capacity';
import conditions from './conditions';
import device from './device';
import forms from './forms';
import geocode from './geocode';
import lectors from './lectors';
import meals from './meals';
import news from './news';
import participant from './participant';
import performers from './performers';
import server from './server';
import session from './session';
import teams from './teams';
import texts from './texts';
import tips from './tips';
import workshops from './workshops';
import years from './years';

export default function createReducer() {
  return combineReducers({
    accomodation,
    archive,
    capacity,
    conditions,
    device,
    forms,
    geocode,
    lectors,
    meals,
    news,
    participant,
    performers,
    server,
    session,
    teams,
    texts,
    tips,
    workshops,
    years,
  });
}
