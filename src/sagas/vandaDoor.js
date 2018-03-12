import { call, put, takeLatest } from 'redux-saga/effects';

import { parse as parseUrl } from 'url';

import { redirectSignup } from './redirects';

import * as constants from '../constants';

export function* openVandaDoor() {
  if (typeof window !== 'undefined' && window.location.href.indexOf('magicDoorToken') !== -1) {
    const { magicDoorToken } = parseUrl(window.location.href, true).query;

    if (magicDoorToken === constants.MAGIC_DOOR_TOKEN) {
      yield put({ type: constants.MAGIC_DOOR_TOKEN });
      yield call(redirectSignup);
    }
  }
}

export function* requireVandaDoor() {
  yield takeLatest(
    constants.APP_MOUNTED,
    openVandaDoor
  );
}

export default [
  requireVandaDoor,
];
