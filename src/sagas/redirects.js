import { put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { reverse } from '../routeTable';
import { getLang } from '../selectors';

export function* redirect(dest) {
  const lang = yield select(getLang);
  yield put(push(reverse(lang, dest)));
}

export function* redirectSignup() {
  yield redirect('signup');
}

export function* redirectHome() {
  yield redirect('participantHome');
}

export default { redirectHome };
