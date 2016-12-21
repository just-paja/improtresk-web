import { fork } from 'redux-saga/effects';

import years from './years';

const sagas = [
  ...years,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
