import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

export function* fetchWorkshopsOnMount() {
  yield* takeLatest(
    constants.WORKSHOPS_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchWorkshops,
    state => state.workshops.valid,
    {
      onStart: constants.WORKSHOPS_FETCH_STARTED,
      onSuccess: constants.WORKSHOPS_FETCH_SUCCESS,
      onError: constants.WORKSHOPS_FETCH_ERROR,
    }
  );
}

export function* fetchWorkshopDetailOnMount() {
  yield* takeLatest(
    constants.WORKSHOP_DETAIL_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchWorkshopDetail,
    state => state.workshopDetail.valid,
    {
      onStart: constants.WORKSHOP_DETAIL_FETCH_STARTED,
      onSuccess: constants.WORKSHOP_DETAIL_FETCH_SUCCESS,
      onError: constants.WORKSHOP_DETAIL_FETCH_ERROR,
    }
  );
}

export default [
  fetchWorkshopsOnMount,
  fetchWorkshopDetailOnMount,
];
