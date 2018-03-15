import { call, put, select, takeEvery } from 'redux-saga/effects';

import { requireCapacityPoll, stopCapacityPoll } from '../../years/actions';
import { fetchResourceIfRequired } from '../../sagas/api';
import { isWorkshopListRequired } from '../selectors';
import { yearActiveNumber } from '../../years/selectors';

import * as api from '../../api';
import * as constants from '../constants';

function* fetchWorkshopList() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield put(requireCapacityPoll());
    yield call(
      fetchResourceIfRequired,
      api.fetchWorkshops,
      {
        isRequired: isWorkshopListRequired,
        actions: {
          start: constants.WORKSHOPS_FETCH_STARTED,
          success: constants.WORKSHOPS_FETCH_SUCCESS,
          fail: constants.WORKSHOPS_FETCH_ERROR,
        },
        params: { year },
      }
    );
  }
}

function* stopPolling() {
  yield put(stopCapacityPoll());
}

function* onWorkshopListRequire() {
  yield takeEvery(constants.WORKSHOPS_REQUIRED, fetchWorkshopList);
}

function* onWorkshopListExit() {
  yield takeEvery(constants.WORKSHOPS_LEFT, stopPolling);
}

export default [
  onWorkshopListExit,
  onWorkshopListRequire,
];
