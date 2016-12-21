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

const fetchWorkshopDetailIfNeeded = fetchResourceIfNeeded(
  api.fetchWorkshopDetail,
  state => state.workshopDetail.valid,
  {
    onStart: constants.WORKSHOP_DETAIL_FETCH_STARTED,
    onSuccess: constants.WORKSHOP_DETAIL_FETCH_SUCCESS,
    onError: constants.WORKSHOP_DETAIL_FETCH_ERROR,
  }
);

export function* fetchWorkshopDetailOnMount() {
  yield* takeLatest(constants.WORKSHOP_DETAIL_MOUNTED, fetchWorkshopDetailIfNeeded);
}

export default [
  fetchWorkshopsOnMount,
  fetchWorkshopDetailOnMount,
];
