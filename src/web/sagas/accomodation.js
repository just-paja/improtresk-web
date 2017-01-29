import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { fetchTextsIfNeeded } from './texts';
import { isValid } from '../selectors/accomodation';

import * as api from '../api';
import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

export function* fetchAccomodationOnMount() {
  yield takeLatest(
    constants.ACCOMODATION_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchAccomodation,
    isValid,
    {
      onStart: constants.ACCOMODATION_FETCH_STARTED,
      onSuccess: constants.ACCOMODATION_FETCH_SUCCESS,
      onError: constants.ACCOMODATION_FETCH_ERROR,
    }
  );
}

export function* fetchTextsOnMount() {
  yield takeLatest(
    constants.ACCOMODATION_MOUNTED,
    fetchTextsIfNeeded,
    [texts.ACCOMODATION_INTRO]
  );
}

export default [
  fetchAccomodationOnMount,
  fetchTextsOnMount,
];
