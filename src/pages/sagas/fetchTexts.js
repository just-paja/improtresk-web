import { put, takeLatest } from 'redux-saga/effects';

import * as constants from '../constants';
import * as texts from '../../texts/constants';

export function* requireTips() {
  yield put({ type: texts.TIPS_REQUIRED });
}

export function* fetchTipsTexts() {
  yield takeLatest(
    constants.PAGE_TIPS_ENTERED,
    requireTips
  );
}

export default [
  fetchTipsTexts,
];
