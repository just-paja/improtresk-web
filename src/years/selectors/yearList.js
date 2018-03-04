import moment from 'moment';

import { createSelector } from 'reselect';
import {
  getData,
  isRequired,
} from 'react-saga-rest';

export const getYearListState = state => state.years.list;

export const getYearList = getData(getYearListState);

export const isYearListRequired = isRequired(getYearListState);

export const yearsAll = createSelector(
  getYearList,
  list => list.slice().sort((a, b) => {
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

const getYearProp = (year, prop) => (year ? (year[prop] || null) : null);

export const getRegistrationCloseDate = createSelector(
  yearCurrent,
  year => getYearProp(year, 'startDate')
);

export const getRegistrationOpenDate = createSelector(
  yearCurrent,
  year => getYearProp(year, 'startSignupsAt')
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

export const getFoodOrdersCloseDate = createSelector(
  yearActive,
  year => year.endFoodPickingAt
);
