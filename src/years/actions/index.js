import * as constants from '../constants';

export const requireRules = () => ({
  type: constants.YEAR_RULES_REQUIRED,
});

export const requireYearList = () => ({
  type: constants.YEARS_REQUIRED,
});

export const requireYearDetail = year => ({
  type: constants.YEAR_DETAIL_REQUIRED,
  year,
});

export const requireCapacityPoll = () => ({
  type: constants.YEAR_CAPACITY_POLL_REQUIRED,
});

export const stopCapacityPoll = () => ({
  type: constants.YEAR_CAPACITY_POLL_STOP,
});
