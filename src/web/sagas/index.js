import { fork } from 'redux-saga/effects';

import accomodation from './accomodation';
import conditions from './conditions';
import news from './news';
import years from './years';
import texts from './texts';
import tips from './tips';
import workshops from './workshops';

const sagas = [
  ...accomodation,
  ...conditions,
  ...news,
  ...years,
  ...texts,
  ...tips,
  ...workshops,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
