import { call, put, select, takeEvery } from 'redux-saga/effects';

import { requireCapacityPoll, stopCapacityPoll } from '../../years/actions';
import { fetchResourceIfRequired } from '../../sagas/api';
import { isAccomodationListRequired } from '../selectors';
import { yearActiveNumber } from '../../years/selectors';

import * as api from '../../api';
import * as constants from '../constants';

function* fetchAccomodationList() {
  const year = yield select(yearActiveNumber);
  yield put(requireCapacityPoll());
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

function* stopPolling() {
  yield put(stopCapacityPoll());
}

function* onAccomodationListRequire() {
  yield takeEvery(constants.ACCOMODATION_REQUIRED, fetchAccomodationList);
}

function* onAccomodationListExit() {
  yield takeEvery(constants.ACCOMODATION_LEFT, stopPolling);
}

export default [
  onAccomodationListExit,
  onAccomodationListRequire,
];
