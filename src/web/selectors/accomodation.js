import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getAccomodationState = state => state.accomodation;

export const accomodationAll =
  createSelector(getAccomodationState, accomodation => accomodation.data);

export const getCheapestAccomodation =
  createSelector(
    accomodationAll,
    accomodation => accomodation.reduce((best, current) => {
      if (!best || current.price < best.price) {
        return current;
      }
      return best;
    }, null)
  );

export const isValid = state => isStateValid(state.accomodation);
