import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getScheduleState = state => state.schedule;

export const isValid = createSelector(
  getScheduleState,
  isStateValid
);

export const getScheduleEvents = createSelector(
  getScheduleState,
  state => state.data
);
