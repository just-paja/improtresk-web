import * as constants from '../constants';

export const requireYearList = () => ({
  type: constants.YEARS_REQUIRED,
});

export const requireCapacityPoll = () => ({
  type: constants.YEAR_CAPACITY_POLL_REQUIRED,
});
