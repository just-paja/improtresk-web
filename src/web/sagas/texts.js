import { fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded, isValid } from './common';

import * as api from '../api';
import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

export const isTextCodeValid = code => state =>
  (state.texts ? isValid(state.texts[code]) : false);

export function* fetchTextIfNeeded(code, action) {
  const isTextValid = isTextCodeValid(code);
  yield isTextValid;
  yield fork(
    fetchResourceIfNeeded,
    api.fetchText,
    isTextValid,
    {
      onStart: constants.TEXT_FETCH_STARTED,
      onSuccess: constants.TEXT_FETCH_SUCCESS,
      onError: constants.TEXT_FETCH_ERROR,
      code,
    },
    action
  );
}

export function* fetchTextsIfNeeded(codes, action) {
  yield codes.map(code => fork(fetchTextIfNeeded, code, action));
}

export function* fetchTextsOnMount() {
  yield* takeLatest(
    constants.ACCOMODATION_MOUNTED,
    fetchTextsIfNeeded,
    [texts.ACCOMODATION_INTRO]
  );
}

export default [
  fetchTextsOnMount,
];
