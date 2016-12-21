import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

const fetchWorkshopsIfNeeded = fetchResourceIfNeeded(
  api.fetchWorkshops,
  state => state.workshops.valid,
  {
    onStart: constants.WORKSHOPS_FETCH_STARTED,
    onSuccess: constants.WORKSHOPS_FETCH_SUCCESS,
    onError: constants.WORKSHOPS_FETCH_ERROR,
  }
);

export function* fetchWorkshopsOnMount() {
  yield* takeLatest(constants.WORKSHOPS_MOUNTED, fetchWorkshopsIfNeeded);
}

export default [
  fetchWorkshopsOnMount,
];
