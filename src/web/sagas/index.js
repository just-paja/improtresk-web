import { fork } from 'redux-saga/effects';

import conditions from './conditions';
import news from './news';
import years from './years';
import tips from './tips';
import workshops from './workshops';

const sagas = [
  ...conditions,
  ...news,
  ...years,
  ...tips,
  ...workshops,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
