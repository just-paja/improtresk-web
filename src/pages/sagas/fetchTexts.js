import { put, takeLatest } from 'redux-saga/effects';

import * as constants from '../constants';
import * as texts from '../../texts/constants';

import { fetchTextsIfRequired } from '../../texts/sagas/fetchText';

export function* requireTips() {
  yield put({ type: texts.TIPS_REQUIRED });
}

export function* fetchAccomodationTexts() {
  yield takeLatest(
    constants.PAGE_ACCOMODATION_ENTERED,
    fetchTextsIfRequired,
    [texts.ACCOMODATION_INTRO]
  );
}

export function* fetchFeesTexts() {
  yield takeLatest(
    constants.PAGE_FEES_ENTERED,
    fetchTextsIfRequired,
    [
      texts.FEES_WHAT_DO_YOU_PAY_FOR,
      texts.FEES_HOW_TO_PAY,
      texts.FEES_HOW_TO_SIGN_OUT,
    ]
  );
}

export function* fetchFoodTexts() {
  yield takeLatest(
    constants.PAGE_FOOD_ENTERED,
    fetchTextsIfRequired,
    [texts.FOOD_INTRO]
  );
}

export function* fetchHomeTexts() {
  yield takeLatest(
    constants.PAGE_HOME_ENTERED,
    fetchTextsIfRequired,
    [texts.ABOUT_FESTIVAL_SHORT]
  );
}

export function* fetchLocationsTexts() {
  yield takeLatest(
    constants.PAGE_LOCATIONS_ENTERED,
    fetchTextsIfRequired,
    [texts.LOCATIONS_INTRO]
  );
}

export function* fetchTipsTexts() {
  yield takeLatest(
    constants.PAGE_TIPS_ENTERED,
    requireTips
  );
}

export default [
  fetchAccomodationTexts,
  fetchFeesTexts,
  fetchFoodTexts,
  fetchHomeTexts,
  fetchLocationsTexts,
  fetchTipsTexts,
];
