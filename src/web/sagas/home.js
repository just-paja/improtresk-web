import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { parse as parseUrl } from 'url';

import { reverse } from '../routeTable';

import { fetchTextsIfNeeded } from './texts';

import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

export function* fetchTextsOnMount() {
  yield takeLatest(
    constants.HOME_MOUNTED,
    fetchTextsIfNeeded,
    [
      texts.ABOUT_FESTIVAL_SHORT,
    ]
  );
}

export function* openVandaDoor() {
  if (typeof window !== 'undefined' && window.location.href.indexOf('magicDoorToken') !== -1) {
    const { magicDoorToken } = parseUrl(window.location.href, true).query;

    if (magicDoorToken === constants.MAGIC_DOOR_TOKEN) {
      yield put({ type: constants.MAGIC_DOOR_TOKEN });
      yield put(push(reverse('signup')));
    }
  }
}

export function* bindVandaDoor() {
  yield takeLatest(
    constants.HOME_MOUNTED,
    openVandaDoor
  );
}

export default [
  fetchTextsOnMount,
  bindVandaDoor,
];
