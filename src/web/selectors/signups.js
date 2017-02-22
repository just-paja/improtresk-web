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

const getNow = () => moment();

export const areSignupsOpen = createSelector(
  [getSignupsOpenDate, getSignupsCloseDate, getNow],
  (start, end, now) => {
    if (!start || !end) {
      return false;
    }

    return now.isAfter(start) && now.isBefore(end);
  }
);
