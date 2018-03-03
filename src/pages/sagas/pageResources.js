import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from '../constants';
import { ACCOMODATION_REQUIRED } from '../../accomodation/constants';
import { MEALS_REQUIRED } from '../../food/constants';
import {
  NEWS_REQUIRED,
  NEWS_DETAIL_REQUIRED,
} from '../../news/constants';
import {
  TEAMS_REQUIRED,
} from '../../participants/constants';
import { SCHEDULE_EVENTS_REQUIRED } from '../../schedule/constants';
import { PERFORMERS_REQUIRED } from '../../performers/constants';
import {
  WORKSHOPS_REQUIRED,
  WORKSHOP_DETAIL_REQUIRED,
  WORKSHOP_LOCATIONS_REQUIRED,
} from '../../workshops/constants';
import {
  YEAR_ARCHIVE_DETAIL_REQUIRED,
  YEAR_CAPACITY_POLL_STOP_REQUIRED,
  YEAR_CAPACITY_REQUIRED,
  YEAR_CONDITIONS_REQUIRED,
} from '../../years/constants';

export function* disableCapacityPoll() {
  yield put({ type: YEAR_CAPACITY_POLL_STOP_REQUIRED });
}

export function* requireConditions() {
  yield put({ type: YEAR_CONDITIONS_REQUIRED });
}

export function* requireAccomodation() {
  yield put({ type: ACCOMODATION_REQUIRED });
  yield put({ type: YEAR_CAPACITY_REQUIRED });
}

export function* requireFood() {
  yield put({ type: MEALS_REQUIRED });
}

export function* requireNews() {
  yield put({ type: NEWS_REQUIRED });
}

export function* requireNewsDetail(action) {
  yield put({ type: NEWS_DETAIL_REQUIRED, slug: action.slug });
  yield call(requireNews);
}

export function* requireYearDetail(action) {
  yield put({ type: YEAR_ARCHIVE_DETAIL_REQUIRED, year: action.year });
}

export function* requireParticipantOrderData() {
  yield put({ type: 'STUB ' });
}

export function* requireSchedulePageResources() {
  yield put({ type: WORKSHOPS_REQUIRED });
  yield put({ type: SCHEDULE_EVENTS_REQUIRED });
  yield put({ type: PERFORMERS_REQUIRED });
}

export function* requireSignupPageResources() {
  yield put({ type: TEAMS_REQUIRED });
}

export function* requireWorkshopList() {
  yield put({ type: WORKSHOPS_REQUIRED });
  yield put({ type: YEAR_CAPACITY_REQUIRED });
}

export function* requireWorkshopDetail(action) {
  yield put({
    type: WORKSHOP_DETAIL_REQUIRED,
    workshop: action.workshop,
  });
}

export function* requireWorkshopLocations(action) {
  yield put({
    type: WORKSHOP_LOCATIONS_REQUIRED,
    workshop: action.workshop,
  });
}

export function* onAccomodationEnter() {
  yield takeLatest(
    constants.PAGE_ACCOMODATION_ENTERED,
    requireAccomodation
  );
}

export function* onAccomodationExit() {
  yield takeLatest(
    constants.PAGE_ACCOMODATION_LEFT,
    disableCapacityPoll
  );
}

export function* onConditionsEnter() {
  yield takeLatest(
    constants.PAGE_CONDITIONS_ENTERED,
    requireConditions
  );
}

export function* onFoodEnter() {
  yield takeLatest(
    constants.PAGE_FOOD_ENTERED,
    requireFood
  );
}

export function* onHomeEnter() {
  yield takeLatest(
    constants.PAGE_HOME_ENTERED,
    requireNews
  );
}

export function* onLocationsEnter() {
  yield takeLatest(
    constants.PAGE_LOCATIONS_ENTERED,
    requireWorkshopLocations
  );
}

export function* onNewsDetailEnter() {
  yield takeLatest(
    constants.PAGE_NEWS_DETAIL_ENTERED,
    requireNewsDetail
  );
}

export function* onParticipantHomeEnter() {
  yield takeLatest(
    constants.PAGE_PARTICIPANT_HOME_ENTERED,
    requireParticipantOrderData
  );
}

export function* onSchedulePageEnter() {
  yield takeLatest(
    constants.PAGE_SCHEDULE_ENTERED,
    requireSchedulePageResources
  );
}

export function* onWorkshopListEnter() {
  yield takeLatest(
    constants.PAGE_WORKSHOPS_ENTERED,
    requireWorkshopList
  );
}

export function* onWorkshopListExit() {
  yield takeLatest(
    constants.PAGE_WORKSHOPS_LEFT,
    disableCapacityPoll
  );
}

export function* onWorkshopDetailEnter() {
  yield takeLatest(
    constants.PAGE_WORKSHOP_DETAIL_ENTERED,
    requireWorkshopDetail
  );
}

export function* onSignupEnter() {
  yield takeLatest(
    constants.PAGE_SIGNUP_ENTERED,
    requireSignupPageResources
  );
}

export function* onYearDetailEnter() {
  yield takeLatest(
    constants.PAGE_ARCHIVED_YEAR_ENTERED,
    requireYearDetail
  );
}

export default [
  onAccomodationEnter,
  onAccomodationExit,
  onConditionsEnter,
  onFoodEnter,
  onHomeEnter,
  onNewsDetailEnter,
  onLocationsEnter,
  onSchedulePageEnter,
  onSignupEnter,
  onWorkshopDetailEnter,
  onWorkshopListEnter,
  onWorkshopListExit,
  onYearDetailEnter,
];
