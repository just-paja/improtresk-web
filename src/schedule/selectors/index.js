import { getProgress, isRequired, transformData } from 'react-saga-rest';

import { getPerformerList, getPerformersListState } from '../../performers/selectors';
import { getWorkshopList, getWorkshopListState } from '../../workshops/selectors';
import { getYearListState } from '../../years/selectors';

export const aggregatePerformer = (item, performers) => ({
  ...item,
  performer: item.performer && performers ? (
    performers.find(perf => perf.id === item.performer) || null
  ) : null,
});

export const aggregateWorkshops = (item, workshops) => ({
  ...item,
  workshops: workshops.filter(workshop => item.workshops.indexOf(workshop.id) !== -1),
});

const sortByDate = (a, b) => {
  if (a.startAt > b.startAt) {
    return 1;
  }
  if (a.startAt < b.startAt) {
    return -1;
  }
  return 0;
};


export const getScheduleEventListState = state => state.schedule.events;
export const isScheduleEventListRequired = isRequired(getScheduleEventListState);

export const getScheduleProgress = getProgress(
  getPerformersListState,
  getScheduleEventListState,
  getWorkshopListState,
  getYearListState
);

export const getScheduleEventList = transformData(getScheduleEventListState, {
  sort: sortByDate,
  transformers: [
    {
      transform: aggregateWorkshops,
      select: getWorkshopList,
    },
    {
      transform: aggregatePerformer,
      select: getPerformerList,
    },
  ],
});
