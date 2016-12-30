import { fork } from 'redux-saga/effects';

import accomodation from './accomodation';
import conditions from './conditions';
import fees from './fees';
import forms from './forms';
import meals from './meals';
import news from './news';
import signup from './signup';
import texts from './texts';
import tips from './tips';
import years from './years';
import workshops from './workshops';

const sagas = [
  ...accomodation,
  ...conditions,
  ...fees,
  ...forms,
  ...meals,
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
