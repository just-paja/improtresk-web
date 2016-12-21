import { fork } from 'redux-saga/effects';

import news from './news';
import years from './years';
import workshops from './workshops';

const sagas = [
  ...news,
  ...years,
  ...workshops,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
