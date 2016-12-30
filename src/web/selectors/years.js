import moment from 'moment';

import { createSelector } from 'reselect';

const getYearsState = state => state.years;

export const yearsAll = createSelector(getYearsState, years => years.data);

export const yearsNotCurrent = createSelector(
  getYearsState,
  years => years.data
    .filter(year => !year.current)
    .filter(item => moment().isAfter(item.endAt))
);

export const yearCurrent = createSelector(
  getYearsState,
  years => years.data.find(item => item.current) || null
);

export const yearNext = createSelector(
  getYearsState,
  (years) => {
    const sortedYears = years.data
      .slice(0)
      .sort((a, b) => moment(a.startAt).diff(b.startAt, 'days'));

    const next = sortedYears.find(item => moment().isBefore(item.startAt)) || null;

    return next || sortedYears[sortedYears.length - 1] || null;
  }
);
