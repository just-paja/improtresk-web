import { fork } from 'redux-saga/effects';

import accomodation from './accomodation';
import archive from './archive';
import capacity from './capacity';
import conditions from './conditions';
import fees from './fees';
import forms from './forms';
import geocode from './geocode';
import home from './home';
import lectors from './lectors';
import locations from './locations';
import meals from './meals';
import news from './news';
import orders from './orders';
import participant from './participant';
import performers from './performers';
import polls from './polls';
import schedule from './schedule';
import signup from './signup';
import teams from './teams';
import tips from './tips';
import workshops from './workshops';
import years from './years';

const sagas = [
  ...accomodation,
  ...archive,
  ...capacity,
  ...conditions,
  ...fees,
  ...forms,
  ...geocode,
  ...home,
  ...lectors,
  ...locations,
  ...meals,
  ...news,
  ...orders,
  ...participant,
  ...performers,
  ...polls,
  ...schedule,
  ...signup,
  ...teams,
  ...tips,
  ...workshops,
  ...years,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
