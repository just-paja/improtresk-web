import { createSelector } from 'reselect';

const getYearsState = state => state.years;

export const yearsAll = createSelector(getYearsState, years => years.data);

export const yearsNotCurrent = createSelector(
  getYearsState,
  years => years.data.filter(year => !year.current)
);

export const yearCurrent = createSelector(
  getYearsState,
  years => years.data.find(item => item.current) || null
);
