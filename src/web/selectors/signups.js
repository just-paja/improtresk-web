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

export const areSignupsOpen = createSelector(
  [getSignupsOpenDate, getSignupsCloseDate],
  (start, end) => {
    if (!start || !end) {
      return false;
    }

    const now = moment();
    return now.isAfter(start) && now.isBefore(end);
  }
);
