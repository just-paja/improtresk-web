import { fork } from 'redux-saga/effects';

import accomodation from './accomodation';
import conditions from './conditions';
import news from './news';
import years from './years';
import tips from './tips';
import workshops from './workshops';

const sagas = [
  ...accomodation,
  ...conditions,
  ...news,
  ...years,
  ...tips,
  ...workshops,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
