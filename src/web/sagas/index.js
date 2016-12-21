import { fork } from 'redux-saga/effects';

import news from './news';
import years from './years';

const sagas = [
  ...news,
  ...years,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
