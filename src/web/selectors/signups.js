import moment from 'moment';

import { createSelector } from 'reselect';

import { yearCurrent } from './years';

export const getSignupsCloseDate =
  createSelector(
    yearCurrent,
    year => (year && year.startDate ? year.startDate : null)
  );

export const getSignupsOpenDate =
  createSelector(
    yearCurrent,
    year => (year && year.startSignupsAt ? year.startSignupsAt : null)
  );

export const getForceOpen =
  createSelector(
    state => state.years,
    years => years.forceOpen
  );

export const areSignupsClosed = createSelector(
  [getSignupsCloseDate],
  (end) => {
    const now = moment();
    if (!end) {
      return false;
    }

    return now.isAfter(end);
  }
);

export const areSignupsOpen = createSelector(
  [getSignupsOpenDate, getForceOpen, areSignupsClosed],
  (start, forceOpen, alreadyClosed) => {
    const now = moment();
    if (!start) {
      return false;
    }

    return (now.isAfter(start) || forceOpen) && !alreadyClosed;
  }
);
