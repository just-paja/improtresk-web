import { createSelector } from 'reselect';

const getYearsState = state => state.years;

export const yearsAll = createSelector(getYearsState, years => years.data);

export const yearCurrent = createSelector(
  getYearsState,
  years => years.data.find(item => item.current) || null
);
