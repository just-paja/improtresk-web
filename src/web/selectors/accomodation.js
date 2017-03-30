import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { getAccomodationCapacity } from './capacity';
import { aggregateAccomodationData } from '../transformers/accomodation';

const getAccomodationState = state => state.accomodation;

export const accomodationAll =
  createSelector(
    [getAccomodationState, getAccomodationCapacity],
    (accomodation, capacity) =>
      accomodation.data.map(aggregateAccomodationData(capacity))
  );

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
