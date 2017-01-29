import { takeLatest } from 'redux-saga/effects';

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

export default [
  fetchTextsOnMount,
];
