import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import accomodation from '../accomodation/reducers';
import device from '../reducers/device';
import food from '../food/reducers';
import locations from '../locations/reducers';
import news from '../news/reducers';
import orders from '../orders/reducers';
import participants from '../participants/reducers';
import performers from '../performers/reducers';
import roommates from '../roommates/reducers';
import server from '../reducers/server';
import session from './session';
import schedule from '../schedule/reducers';
import texts from '../texts/reducers';
import workshops from '../workshops/reducers';
import years from '../years/reducers';

export default combineReducers({
  accomodation,
  device,
  food,
  form,
  locale,
  locations,
  news,
  orders,
  participants,
  performers,
  roommates,
  routing,
  server,
  session,
  schedule,
  texts,
  workshops,
  years,
});
