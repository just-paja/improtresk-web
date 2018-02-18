import { call, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isAccomodationListRequired } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchAccomodationList() {
  yield call(fetchResourceIfRequired, api.fetchAccomodation, {
    isRequired: isAccomodationListRequired,
    actions: {
      start: constants.ACCOMODATION_FETCH_STARTED,
      success: constants.ACCOMODATION_FETCH_SUCCESS,
      fail: constants.ACCOMODATION_FETCH_ERROR,
    },
  });
}

export function* requireAccomodationList() {
  yield takeLatest(constants.ACCOMODATION_REQUIRED, fetchAccomodationList);
}

export default [
  requireAccomodationList,
];
