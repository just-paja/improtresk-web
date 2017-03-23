import { createSelector } from 'reselect';

import { getPerformers } from './performers';
import { workshopsAll } from './workshops';
import { isStateValid } from './common';

import { aggregateEventData } from '../transformers/events';

const getScheduleState = state => state.schedule;

const sortByDate = (a, b) => {
  if (a.startAt > b.startAt) {
    return 1;
  }
  if (a.startAt < b.startAt) {
    return -1;
  }
  return 0;
};

export const isValid = createSelector(
  getScheduleState,
  isStateValid
);

export const getScheduleEvents = createSelector(
  [getScheduleState, workshopsAll, getPerformers],
  (state, workshops, performers) =>
    state.data
      .map(aggregateEventData(workshops, performers))
      .sort(sortByDate)
);
