import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import app from './app';
import accomodation from '../accomodation/sagas';
// import fees from './fees';
import food from '../food/sagas';
import forms from '../forms/sagas';
import geocode from './geocode';
import locales from './locales';
// import locations from './locations';
import news from '../news/sagas';
// import orders from './orders';
import participants from '../participants/sagas';
import performers from '../performers/sagas';
import pages from '../pages/sagas';
// import polls from './polls';
import schedule from '../schedule/sagas';
import texts from '../texts/sagas';
import vandaDoor from './vandaDoor';
import workshops from '../workshops/sagas';
import years from '../years/sagas';

const sagas = [
  ...app,
  ...accomodation,
  // ...fees,
  ...food,
  ...forms,
  ...geocode,
  // ...lectors,
  ...locales,
  // ...locations,
  // ...meals,
  ...news,
  // ...orders,
  ...pages,
  ...participants,
  ...performers,
  // ...polls,
  ...schedule,
  ...texts,
  ...vandaDoor,
  ...workshops,
  ...years,
];

function* onEachError(next, error) {
  yield logWarning(error);
}

function* onFail(error) {
  yield logError(error);
}

export function* serverSagas() {
  yield all(sagas.map(saga => call(saga)));
}

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(keepAlive(saga, {
    onEachError,
    onFail,
  }))));
}
