import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getArchiveState = state => state.archive;
const getArchiveData = state => getArchiveState(state).data;

export const getCurrent = createSelector(getArchiveState, state => state.current);

export const getArchivedYear = createSelector(
  getArchiveData,
  current => (current ? current.year : null)
);

export const getArchivedYearTopic = createSelector(
  getArchiveData,
  current => (current ? current.topic : null)
);

export const getArchivedYearWorkshops = createSelector(
  getArchiveData,
  current => (current ? (current.workshops || []) : [])
);


export const isValid = state => isStateValid(getArchiveState(state));
