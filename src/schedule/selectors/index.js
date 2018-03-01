import { isRequired, transformData } from 'react-saga-rest';

import { getPerformers } from '../../performers/selectors';
import { getWorkshopList } from '../../workshops/selectors';

export const aggregatePerformer = (item, performers) => ({
  ...item,
  performer: item.performer ? (performers.find(perf => perf.id === item.performer) || null) : null,
});

export const aggregateWorkshops = (item, workshops) => ({
  ...item,
  workshops: workshops.filter(workshop => item.workshops.indexOf(workshop.id)),
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

export const getScheduleEventList = transformData(getScheduleEventListState, {
  sort: sortByDate,
  transformers: [
    {
      transform: aggregateWorkshops,
      select: getWorkshopList,
    },
    {
      transform: aggregatePerformer,
      select: getPerformers,
    },
  ],
});
