import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

export function* fetchCurrentConditionsOnMount() {
  yield* takeLatest(
    [
      constants.CONDITIONS_MOUNTED,
    ],
    fetchResourceIfNeeded,
    api.fetchConditionsCurrent,
    state => state.conditions.current.valid,
    {
      onStart: constants.CONDITIONS_CURRENT_FETCH_STARTED,
      onSuccess: constants.CONDITIONS_CURRENT_FETCH_SUCCESS,
      onError: constants.CONDITIONS_CURRENT_FETCH_ERROR,
    }
  );
}

export default [
  fetchCurrentConditionsOnMount,
];
