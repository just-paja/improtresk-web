import * as api from '../../api';
import * as constants from '../constants';

import { createRoutine } from '../../routines';

export const requireRules = () => ({
  type: constants.YEAR_RULES_REQUIRED,
});

export const requireYearList = () => ({
  type: constants.YEARS_REQUIRED,
});

export const requireCapacityPoll = () => ({
  type: constants.YEAR_CAPACITY_POLL_REQUIRED,
});

export const stopCapacityPoll = () => ({
  type: constants.YEAR_CAPACITY_POLL_STOP,
});

export const yearDetailFetch = createRoutine(constants.YEAR_DETAIL_FETCH, api.fetchArchivedYear);
