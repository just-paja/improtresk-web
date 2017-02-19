import { takeLatest } from 'redux-saga/effects';

import { fetchTextsIfNeeded } from './texts';

import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

export function* requestWorkshopLocationsIntro() {
  yield takeLatest(
    constants.REQUEST_WORKSHOP_LOCATIONS,
    fetchTextsIfNeeded,
    [texts.LOCATIONS_INTRO]
  );
}

export default [
  requestWorkshopLocationsIntro,
];
