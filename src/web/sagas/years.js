import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

const fetchYearsIfNeeded = fetchResourceIfNeeded(
  api.fetchYears,
  state => state.years.valid,
  {
    onStart: constants.YEARS_FETCH_STARTED,
    onSuccess: constants.YEARS_FETCH_SUCCESS,
    onError: constants.YEARS_FETCH_ERROR,
  }
);

export function* fetchYearsOnMount() {
  yield* takeLatest([
    constants.APP_MOUNTED,
    constants.HOME_MOUNTED,
  ], fetchYearsIfNeeded);
}

export default [
  fetchYearsOnMount,
];
