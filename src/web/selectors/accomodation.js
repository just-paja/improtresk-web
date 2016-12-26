import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getAccomodationState = state => state.accomodation;

export const accomodationAll =
  createSelector(getAccomodationState, accomodation => accomodation.data);

export const isValid = state => isStateValid(state.accomodation);
