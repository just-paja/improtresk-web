import { fork } from 'redux-saga/effects';

import accomodation from './accomodation';
import archive from './archive';
import conditions from './conditions';
import fees from './fees';
import forms from './forms';
import home from './home';
import lectors from './lectors';
import meals from './meals';
import news from './news';
import signup from './signup';
import texts from './texts';
import tips from './tips';
import years from './years';
import workshops from './workshops';

const sagas = [
  ...accomodation,
  ...archive,
  ...conditions,
  ...fees,
  ...forms,
  ...home,
  ...lectors,
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
