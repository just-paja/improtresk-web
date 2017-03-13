import moment from 'moment';

import { createSelector } from 'reselect';

const getYearsState = state => state.years;

export const yearsAll = createSelector(
  getYearsState,
  years => years.data
    .slice()
    .sort((a, b) => {
      if (a.startDate > b.startDate) {
        return 1;
      }
      if (a.startDate < b.startDate) {
        return -1;
      }
      return 0;
    })
);

export const yearsNotCurrent = createSelector(
  yearsAll,
  years => years
    .filter(year => !year.current)
    .filter(item => moment().isAfter(item.endDate))
);

export const yearCurrent = createSelector(
  yearsAll,
  years => years.find(item => item.current) || null
);

export const yearNext = createSelector(
  yearsAll,
  (years) => {
    const sortedYears = years
      .slice(0)
      .sort((a, b) => moment(a.startDate).diff(b.startDate, 'days'));

    const next = sortedYears.find(item => moment().isBefore(item.startDate)) || null;

    return next || sortedYears[sortedYears.length - 1] || null;
  }
);

export const yearActive = createSelector(
  [yearCurrent, yearNext],
  (current, next) => (current || next)
);

export const yearActiveNumber = createSelector(
  [yearActive],
  activeYear => (activeYear ? activeYear.year : null)
);

export const shouldFetchYears = createSelector(
  getYearsState,
  years => years.valid
);
