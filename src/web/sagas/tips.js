import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

const fetchTipsIfNeeded = fetchResourceIfNeeded(
  api.fetchTips,
  state => state.tips.valid,
  {
    onStart: constants.TIPS_FETCH_STARTED,
    onSuccess: constants.TIPS_FETCH_SUCCESS,
    onError: constants.TIPS_FETCH_ERROR,
  }
);

export function* fetchTipsOnMount() {
  yield* takeLatest(constants.TIPS_MOUNTED, fetchTipsIfNeeded);
}

export default [
  fetchTipsOnMount,
];
