import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isConditionsTextRequired } from '../selectors/yearConditions';
import { yearActiveNumber } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchYearsConditions() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield fork(
      fetchResourceIfRequired,
      api.fetchConditionsCurrent,
      {
        isRequired: isConditionsTextRequired,
        actions: {
          start: constants.YEAR_CONDITIONS_FETCH_STARTED,
          success: constants.YEAR_CONDITIONS_FETCH_SUCCESS,
          fail: constants.YEAR_CONDITIONS_FETCH_ERROR,
        },
        params: { year },
      }
    );
  }
}
export function* fetchConditions() {
  yield takeLatest(
    constants.YEAR_CONDITIONS_REQUIRED,
    fetchYearsConditions
  );
}

export default [
  fetchConditions,
];
