import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { shouldFetchYears } from '../selectors/years';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchYearsOnMount() {
  yield takeLatest(
    [
      constants.APP_MOUNTED,
      constants.HOME_MOUNTED,
      constants.CONDITIONS_MOUNTED,
      constants.SIGNUP_MOUNTED,
    ],
    fetchResourceIfNeeded,
    api.fetchYears,
    shouldFetchYears,
    {
      onStart: constants.YEARS_FETCH_STARTED,
      onSuccess: constants.YEARS_FETCH_SUCCESS,
      onError: constants.YEARS_FETCH_ERROR,
    }
  );
}

export default [
  fetchYearsOnMount,
];
