import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isRulesTextRequired, yearActiveNumber } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

function* fetchYearsRules() {
  const year = yield select(yearActiveNumber);
  if (year) {
    yield call(
      fetchResourceIfRequired,
      api.fetchRules,
      {
        isRequired: isRulesTextRequired,
        actions: {
          start: constants.YEAR_RULES_FETCH_START,
          success: constants.YEAR_RULES_FETCH_SUCCESS,
          fail: constants.YEAR_RULES_FETCH_ERROR,
        },
        params: { year },
      }
    );
  }
}

function* fetchRules() {
  yield takeEvery(
    constants.YEAR_RULES_REQUIRED,
    fetchYearsRules
  );
}

export default [
  fetchRules,
];
