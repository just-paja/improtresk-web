import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import { routerReducer as routing } from 'react-router-redux';

import accomodation from '../accomodation/reducers';
import device from '../reducers/device';
import food from '../food/reducers';
import forms from '../forms/reducers';
import geocode from '../reducers/geocode';
import news from '../news/reducers';
import participants from '../participants/reducers';
import server from '../reducers/server';
import session from './session';
import texts from '../texts/reducers';
import workshops from '../workshops/reducers';
import years from '../years/reducers';

export default combineReducers({
  accomodation,
  device,
  food,
  forms,
  geocode,
  locale,
  news,
  participants,
  routing,
  server,
  session,
  texts,
  workshops,
  years,
});
