import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import accomodation from '../accomodation/sagas';
import app from './app';
import food from '../food/sagas';
import locales from './locales';
import locations from '../locations/sagas';
import news from '../news/sagas';
import orders from '../orders/sagas';
import pages from '../pages/sagas';
import participants from '../participants/sagas';
import performers from '../performers/sagas';
import redirects from './redirects';
import roommates from '../roommates/sagas';
import schedule from '../schedule/sagas';
import texts from '../texts/sagas';
import vandaDoor from './vandaDoor';
import workshops from '../workshops/sagas';
import years from '../years/sagas';

const sagas = [
  ...accomodation,
  ...app,
  ...food,
  ...locales,
  ...locations,
  ...locations,
  ...news,
  ...orders,
  ...pages,
  ...participants,
  ...performers,
  ...redirects,
  ...roommates,
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
