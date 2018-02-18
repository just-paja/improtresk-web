import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isTipListRequired } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* requireTipList() {
  yield takeLatest(
    constants.TIPS_REQUIRED,
    fetchResourceIfRequired,
    api.fetchTips,
    {
      isRequired: isTipListRequired,
      actions: {
        start: constants.TIPS_FETCH_STARTED,
        success: constants.TIPS_FETCH_SUCCESS,
        fail: constants.TIPS_FETCH_ERROR,
      },
    }
  );
}

export default [
  requireTipList,
];
