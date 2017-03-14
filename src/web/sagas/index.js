import { fork } from 'redux-saga/effects';

import accomodation from './accomodation';
import archive from './archive';
import conditions from './conditions';
import fees from './fees';
import forms from './forms';
import geocode from './geocode';
import home from './home';
import lectors from './lectors';
import locations from './locations';
import meals from './meals';
import news from './news';
import participant from './participant';
import performers from './performers';
import signup from './signup';
import teams from './teams';
import tips from './tips';
import workshops from './workshops';
import years from './years';

const sagas = [
  ...accomodation,
  ...archive,
  ...conditions,
  ...fees,
  ...forms,
  ...geocode,
  ...home,
  ...lectors,
  ...locations,
  ...meals,
  ...news,
  ...participant,
  ...performers,
  ...signup,
  ...teams,
  ...tips,
  ...workshops,
  ...years,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
