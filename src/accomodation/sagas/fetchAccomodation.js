import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isAccomodationListRequired } from '../selectors';
import { yearActiveNumber } from '../../years/selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchAccomodationList() {
  const year = yield select(yearActiveNumber);
  yield call(fetchResourceIfRequired, api.fetchAccomodation, {
    isRequired: isAccomodationListRequired,
    actions: {
      start: constants.ACCOMODATION_FETCH_STARTED,
      success: constants.ACCOMODATION_FETCH_SUCCESS,
      fail: constants.ACCOMODATION_FETCH_ERROR,
    },
    params: {
      year,
    },
  });
}

export function* requireAccomodationList() {
  yield takeLatest(constants.ACCOMODATION_REQUIRED, fetchAccomodationList);
}

export default [
  requireAccomodationList,
];
