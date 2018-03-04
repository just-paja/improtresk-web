import { put, takeEvery } from 'redux-saga/effects';

import { requireAccomodationList } from '../../accomodation/actions';
import { requireMealList } from '../../food/actions';
import { requireCapacityPoll } from '../../years/actions';
import {
  requireLectorList,
  requireLectorRoles,
  requireWorkshopDifficulties,
  requireWorkshopList,
} from '../../workshops/actions';

import * as constants from '../constants';

export function* requireOrderResourceList() {
  yield put(requireAccomodationList());
  yield put(requireCapacityPoll());
  yield put(requireLectorList());
  yield put(requireLectorRoles());
  yield put(requireMealList());
  yield put(requireWorkshopDifficulties());
  yield put(requireWorkshopList());
}

export function* onOrderResourceRequire() {
  yield takeEvery(
    constants.ORDER_RESOURCES_REQUIRED,
    requireOrderResourceList
  );
}

export default [
  onOrderResourceRequire,
];
