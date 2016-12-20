import { fork } from 'redux-saga/effects';

const sagas = [];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
