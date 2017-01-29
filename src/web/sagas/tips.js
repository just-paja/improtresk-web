import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from './common';
import { isValid } from '../selectors/tips';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchTipsOnMount() {
  yield takeLatest(
    constants.TIPS_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchTips,
    isValid,
    {
      onStart: constants.TIPS_FETCH_STARTED,
      onSuccess: constants.TIPS_FETCH_SUCCESS,
      onError: constants.TIPS_FETCH_ERROR,
    }
  );
}

export default [
  fetchTipsOnMount,
];
