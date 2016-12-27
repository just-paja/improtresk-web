import { fork } from 'redux-saga/effects';

import accomodation from './accomodation';
import conditions from './conditions';
import foodTimes from './foodTimes';
import fees from './fees';
import forms from './forms';
import news from './news';
import signup from './signup';
import texts from './texts';
import tips from './tips';
import years from './years';
import workshops from './workshops';

const sagas = [
  ...accomodation,
  ...conditions,
  ...foodTimes,
  ...fees,
  ...forms,
  ...news,
  ...signup,
  ...texts,
  ...tips,
  ...years,
  ...workshops,
];

export default function* () {
  yield sagas.map(saga => fork(saga));
}
