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

export const areSignupsOpen = createSelector(
  [getSignupsOpenDate, getSignupsCloseDate, getForceOpen],
  (start, end, forceOpen) => {
    const now = moment();
    if (!start || !end) {
      return false;
    }

    return (now.isAfter(start) && now.isBefore(end)) || forceOpen;
  }
);
