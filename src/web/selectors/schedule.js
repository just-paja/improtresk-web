import { createSelector } from 'reselect';

import { workshopsAll } from './workshops';
import { isStateValid } from './common';

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

const mapWorkshops = workshops => event => ({
  ...event,
  workshops: event.workshops
    .map(item => workshops.find(ws => ws.id === item) || null)
    .filter(item => item),
});

export const getScheduleEvents = createSelector(
  [getScheduleState, workshopsAll],
  (state, workshops) =>
    state.data
      .map(mapWorkshops(workshops))
      .sort(sortByDate)
);
